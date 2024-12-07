import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { movieReturnObject, movieReturnObjectFullest, moviesGetReturnObject } from './return-movie.object'
import { MovieDto } from './dto/movie.dto'
import { generateSlug } from '../utils/generateSlug'
import { EnumMovieSort, GetAllMovieDto } from './dto/get-all.movie.dto'
import { PaginationService } from '../pagination/pagination.service'
import { Prisma } from '@prisma/client'
import { PaginationDto } from '../pagination/pagination.dto'

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService, private pagination: PaginationService) {
	}

	async getAll(dto: GetAllMovieDto = {}) {
		const { sort, searchTerm, type } = dto

		const prismaSort: Prisma.MovieOrderByWithRelationInput [] = []

		if (sort === EnumMovieSort.LONGER) {
			prismaSort.push({ duration: 'desc' })
		} else if (sort === EnumMovieSort.SHORTER) {
			prismaSort.push({ duration: 'asc' })
		} else if (sort === EnumMovieSort.OLDEST) {
			prismaSort.push({ year: 'asc' })
		} else if (sort === EnumMovieSort.NEWEST) {
			prismaSort.push({ year: 'desc' })
		}
		else {
			prismaSort.push({movieId: 'asc'})
		}

		const prismaSearchTermFilter : Prisma.MovieWhereInput  = searchTerm ? {
			OR: [
				{
					name: {
						contains: searchTerm,
					}
				},
				{
					genres: {
						some: {
							genre: {
								name: {
									contains: searchTerm,
								}
							}
						}
					}
				}
			]
		} : {}
		const prismaSearchType: Prisma.MovieWhereInput = type? {
			type: dto.type
		} : {}

		const { perPage, skip } = this.pagination.getPagination(dto)

		const movies = await this.prisma.movie.findMany({
			where: {
				AND: [
					prismaSearchType,
					prismaSearchTermFilter
				]
			},
			select: moviesGetReturnObject,
			orderBy: prismaSort,
			skip,
			take: perPage
		})

		return {
			movies,
			length: await this.prisma.movie.count({
				where: {
					AND: [
						prismaSearchType,
						prismaSearchTermFilter
					]
				}
			})
		}
	}


	async byId(movieId: number) {
		const movie = await this.prisma.movie.findUnique({
			where: {
				movieId: movieId
			},
			select: movieReturnObjectFullest
		})
		if (!movie) throw new NotFoundException('Movie not found')
		return movie
	}

	async bySlug(slug: string) {
		const movie = await this.prisma.movie.findUnique({
			where: {
				slug
			},
			select: movieReturnObjectFullest
		})

		if (!movie) throw new NotFoundException('Movie not found')
		return movie
	}

	async getSimilar(movieId: number, dto: PaginationDto) {
		const { perPage, skip } = this.pagination.getPagination(dto);

		const currentMovie = await this.prisma.movie.findUnique({
			where: { movieId },
			include: {
				genres: { include: { genre: true } },
				cast: { include: { actor: true } },
			},
		});

		if (!currentMovie) {
			throw new NotFoundException('Current Movie not found!');
		}

		const genreIds = currentMovie.genres.map((mg) => mg.genreId);
		const actorIds = currentMovie.cast.map((mc) => mc.actorId);

		const movies = await this.prisma.movie.findMany({
			where: {
				OR: [
					{
						genres: {
							some: {
								genreId: { in: genreIds },
							},
						},
					},
					{
						cast: {
							some: {
								actorId: { in: actorIds },
							},
						},
					},
				],
				AND: {
					movieId: { not: currentMovie.movieId },
				},
			},
			orderBy: {
				year: 'desc',
			},
			select: moviesGetReturnObject,
			skip,
			take: perPage,
		});

		const length = await this.prisma.movie.count({
			where: {
				OR: [
					{
						genres: {
							some: {
								genreId: { in: genreIds },
							},
						},
					},
					{
						cast: {
							some: {
								actorId: { in: actorIds },
							},
						},
					},
				],
				AND: {
					movieId: { not: currentMovie.movieId },
				},
			},
		});

		return { movies, length };
	}

	async createMovie(dto: MovieDto, userId: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId
			}
		})

		if (user.role !== 'admin') {
			throw new ForbiddenException('Access denied');
		}

		const { genres, cast, ...rest } = dto;

		const movie = await this.prisma.movie.create({
			data: {
				...rest,
				slug: generateSlug(dto.name),
				genres: {
					create: await Promise.all(
						genres.map(async (genreName) => {
							const genre = await this.prisma.genre.upsert({
								where: { name: genreName },
								update: {},
								create: { name: genreName },
							});
							return {
								genre: { connect: { genreId: genre.genreId } },
							};
						})
					),
				},
				cast: {
					create: await Promise.all(
						cast.map(async (actorName) => {
							const actor = await this.prisma.actor.upsert({
								where: { name: actorName },
								update: {},
								create: { name: actorName },
							});
							return {
								actor: { connect: { actorId: actor.actorId } },
							};
						})
					),
				},
			},
			select: movieReturnObject,
		});

		return movie;
	}

	async updateMovie(movieId: number, dto: MovieDto, userId: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId
			}
		})

		if (user.role !== 'admin') {
			throw new ForbiddenException('Access denied');
		}

		const movieExists = await this.prisma.movie.findUnique({
			where: { movieId }
		});

		if (!movieExists) {
			throw new NotFoundException(`Movie not found`);
		}

		const { genres, cast, ...rest } = dto;

		await this.prisma.movieGenre.deleteMany({
			where: {
				movieId
			}
		});

		await this.prisma.movieCast.deleteMany({
			where: {
				movieId
			}
		});

		const genresRecords = await Promise.all(
			genres.map(async (name) => {
				const genre = await this.prisma.genre.upsert({
					where: { name },
					update: {},
					create: { name }
				});
				return genre;
			})
		);
		// Переконуємося, що актори існують або створюємо їх
		const actors = await Promise.all(
			cast.map(async (name) => {
				// Перевірка чи існує актор з таким ім'ям, якщо ні, створюємо нового
				const actor = await this.prisma.actor.upsert({
					where: { name },
					update: {},
					create: { name }
				});
				return actor;
			})
		);

		return this.prisma.movie.update({
			where: {
				movieId
			},
			data: {
				...rest,
				slug: generateSlug(dto.name),
				genres: {
					create: genresRecords.map((genre) => ({
						genre: {
							connect: { genreId: genre.genreId }
						}
					}))
				},
				cast: {
					create: actors.map((actor) => ({
						actor: {
							connect: { actorId: actor.actorId }
						}
					}))
				}
			}
		});
	}

	async deleteMovie(movieId: number, userId: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId
			}
		})

		if (user.role !== 'admin') {
			throw new ForbiddenException('Access denied');
		}

		const movieExists = await this.prisma.movie.findUnique({
			where: { movieId }
		});

		if (!movieExists) {
			throw new NotFoundException(`Movie not found`);
		}

		await this.prisma.movie.delete({
			where: {
				movieId
			}
		})

		return {
			message: "Success",
			statusCode: 1
		}
	}
}
