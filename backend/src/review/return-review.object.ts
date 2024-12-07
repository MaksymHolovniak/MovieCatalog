import { Prisma } from '@prisma/client'
import { userReturnObject } from '../user/return-user.object'

export const reviewReturnObject:Prisma.ReviewSelect = {
		user: {
			select: userReturnObject
		},
	createdAt: true,
	text: true,
	reviewId: true
}