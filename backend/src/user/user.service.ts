import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { userReturnObject } from './return-user.object'
import { Prisma } from '@prisma/client'
import { UserDto } from './user.dto'
import { hash } from 'argon2'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {
	}

	async byId(userId: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				...userReturnObject,
				favorites: {
					select: {
						movie: {
							select: {
								movieId: true,
								name: true,
								slug: true,
								imagePath: true,
								clarity: true,
								duration: true
							}
						}
					}
				},
				...selectObject
			}
		})

		if (!user) throw new NotFoundException('User not found')

		return user
	}

	async updateProfile (userId: number, dto: UserDto) {
			const isSameUser = await this.prisma.user.findUnique({
				where: {
					email: dto.email
				}
			})

		if(isSameUser && userId !== isSameUser.id) throw new BadRequestException("Email already in use")

		const user = await this.byId(userId)

		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				email: dto.email,
				name: dto.name,
				avatarPath: dto.avatarPath,
				password: dto.password? await hash(dto.password) : user.password
			}
		})
		return user
	}

	async toggleFavorite(userId: number, movieId: number) {
			const user = await this.byId(userId)

			if(!user) throw new NotFoundException("User not found!")

			const favorite = await this.prisma.favoriteMovie.findFirst({
				where: {
					userId,
					movieId
				}
			});

			if(favorite) {
				await this.prisma.favoriteMovie.delete({
					where: {
						id: favorite.id
					}
				})

			}
			else {
				await this.prisma.favoriteMovie.create({
					data: {
						userId,
						movieId
					}
				})
			}

		return {
				message: "Success",
				statusCode: 1
			}
	}
}
