import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { UserDto } from './user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') userId: number) {
    return this.userService.byId(userId);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async updateProfile(@CurrentUser('id') userId: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(userId, dto);
  }


  @Auth()
  @HttpCode(200)
  @Patch('profile/favorites/:movieId')
  async toggleFavorite(@Param('movieId') movieId: string, @CurrentUser('id') userId: number) {
    return this.userService.toggleFavorite(userId, +movieId);
  }
}
