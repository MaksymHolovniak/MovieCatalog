import { Prisma } from '@prisma/client'
import { reviewReturnObject } from '../review/return-review.object'

export const movieReturnObject: Prisma.MovieSelect = {
	movieId: true,
	name: true,
	type: true,
	imagePath: true,
	trailer: true,
	description: true,
	country: true,
	duration: true,
	clarity: true,
	slug: true,
	rating: true,
	year: true,
	releaseDate: true,
	genres: {
		select: {
			genre: {
				select: {
					genreId: true,
					name: true
				}
			}
		}
	},
	cast: {
		select: {
			actor: {
				select: {
					actorId: true,
					name: true
				}
			}
		}
	},
	reviews: {
		select: reviewReturnObject
	}
}

export const moviesGetReturnObject : Prisma.MovieSelect = {
	movieId: true,
	name: true,
	imagePath: true,
	clarity: true,
	slug: true,
	duration: true
}

export const movieReturnObjectFullest: Prisma.MovieSelect = {
	...movieReturnObject,
	reviews: {
		select: reviewReturnObject
	}
}