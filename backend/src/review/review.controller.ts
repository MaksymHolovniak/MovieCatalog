import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ReviewService } from './review.service';
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { ReviewDto } from './review.dto'

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAll() {
    return this.reviewService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('leave/:movieId')
  @Auth()
  async leaveReview(@CurrentUser('id') userId: number, @Body() dto: ReviewDto, @Param('movieId') movieId: string) {
    return this.reviewService.createReview(userId,dto,+movieId)
  }
}
