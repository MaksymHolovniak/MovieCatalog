import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from '../prisma.service'
import { PaginationService } from '../pagination/pagination.service'

@Module({
  controllers: [MovieController],
  providers: [MovieService, PrismaService,PaginationService]
})
export class MovieModule {}
