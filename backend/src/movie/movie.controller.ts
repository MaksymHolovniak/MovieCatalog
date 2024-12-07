import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query, UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { MovieService } from './movie.service';
import { GetAllMovieDto} from './dto/get-all.movie.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { MovieDto } from './dto/movie.dto'
import { PaginationDto } from '../pagination/pagination.dto'
import { CurrentUser } from '../auth/decorators/user.decorator'
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllMovieDto) {
    return this.movieService.getAll(queryDto)
  }
  @Get(':id')
  async getMovie(@Param('id') id: string) {
    return this.movieService.byId(+id)
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string, @Query() queryDto: PaginationDto) {
    return this.movieService.getSimilar(+id, queryDto)
  }

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.movieService.bySlug(slug)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createMovie(@Body() dto: MovieDto, @CurrentUser('id') id: number) {
    return this.movieService.createMovie(dto, id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async updateMovie(@Param('id') id: string, @Body() dto: MovieDto, @CurrentUser('id') userId: number) {
    return this.movieService.updateMovie(+id, dto, userId)
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async deleteMovie(@Param('id') id: string, @CurrentUser('id') userId: number) {
    return this.movieService.deleteMovie(+id, userId)
  }
}
