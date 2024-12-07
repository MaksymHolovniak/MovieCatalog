
export type UserStateType = {
	email: string
}

export type TokensType = {
	accessToken: string
	refreshToken: string
}

export type InitialStateType = {
	user: UserStateType | null
	isLoading: boolean
}

export type EmailPasswordType = {
	email: string
	password: string
}

type UserResponceType = {
	id: number
	email: string
	name: string
	avatarPath: string
	role: string
}

export interface AuthResponse extends TokensType {
	user: UserResponceType
}

export type FavoritesType = {
	id: null  | number
	name: null | string
	slug: null | string
	imagePath: null | string
	clarity: null | string
	duration: null | string
}