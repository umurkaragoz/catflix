import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { SessionsModule } from '../sessions/sessions.module';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [
    AuthModule,
    SessionsModule,
    TicketsModule,
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
