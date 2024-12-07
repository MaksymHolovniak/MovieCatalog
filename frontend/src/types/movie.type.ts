import { ReviewType } from './review.type.ts'

export type MovieType = {
	movieId: number
	name: string
	type: string
	imagePath: string
	trailer: string
	description: string
	country: string
	duration: number
	clarity: string
	slug: string
	rating: number
	year: number
	releaseDate: string
	genres: string[]
	cast: string[]
	reviews: ReviewType[]
}

export type ValuesMovieType = {
	name: string
	type: string
	imagePath: string
	trailer: string
	description: string
	country: string
	duration: number
	clarity: string
	rating: number
	year: number
	releaseDate: string
	genres: string[]
	cast: string[]
}



export type MoviesAllType = {
	movieId: number
	name: string
	imagePath: string
	clarity: string
	slug: string
	duration: number
}



export type MoviesAllResponseType = {
	movies: Array<MoviesAllType>
	length: number
}