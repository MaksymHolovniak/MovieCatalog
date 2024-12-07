import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [ConfigModule.forRoot(),AuthModule, UserModule, MovieModule, ReviewModule, PaginationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
