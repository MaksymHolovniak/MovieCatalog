import { Injectable} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { reviewReturnObject } from './return-review.object'
import { ReviewDto } from './review.dto'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.review.findMany({
			orderBy: {
				createdAt: "desc"
			},
			select: reviewReturnObject
		})
	}

	async createReview(userId: number, dto: ReviewDto, movieId: number) {
		return this.prisma.review.create({
			data: {
				text: dto.text,
				movie: {
					connect: {
						movieId: movieId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}
}
