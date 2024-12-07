import { UserType } from './user.type.ts'

export type ReviewType = {
	user: UserType
	createdAt: string
	text: string
	reviewId: number
}

export type PostReviewResponse = {
	reviewId: number
	createdAt: string
	text: string
	userId: number
	movieId: number
}