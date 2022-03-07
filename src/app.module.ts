import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { MoviesController } from './movies/movies.controller';
import { AuditoriumsModule } from './auditoriums/auditoriums.module';
import { SessionsModule } from './sessions/sessions.module';
import { TicketsModule } from './tickets/tickets.module';
import * as databaseConfig from './config/database.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MoviesModule,
    TicketsModule,
    SessionsModule,
    AuditoriumsModule,
    TypeOrmModule.forRoot(databaseConfig),
  ],
  controllers: [
    AppController,
    MoviesController,
  ],
})
export class AppModule {}
