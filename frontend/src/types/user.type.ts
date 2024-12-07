import { MoviesAllType } from './movie.type.ts'

export type UserType = {
	id: number
	email: string
	name: string
	avatarPath: string
	role: string
}

export type ToggleFavoriteResponse = {
	message: string
	statusCode: number
}

export type UserWithFavoritesType = {
	id: number
	email: string
	name: string
	avatarPath: string
	profile: string
	favorites: MoviesAllType[]
}

export type ValuesRegistrationType = {
	email: string
	password: string
	name: string
}

export type ValuesLoginType = {
	email: string
	password: string
}