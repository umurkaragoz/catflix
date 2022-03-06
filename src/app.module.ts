import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { MoviesModule } from './movies/movies.module';
import { MoviesController } from './movies/movies.controller';
import { Movie } from './movies/entities/movie.entity';
import { AuditoriumsModule } from './auditoriums/auditoriums.module';
import { SessionsModule } from './sessions/sessions.module';
import { Session } from './sessions/entities/session.entity';
import { Auditorium } from './auditoriums/entities/auditorium.entity';
import { TicketsModule } from './tickets/tickets.module';
import { Ticket } from './tickets/entities/ticket.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MoviesModule,
    TicketsModule,
    SessionsModule,
    AuditoriumsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'catflix',
      entities: [User, Movie, Session, Auditorium, Ticket],
      // Reuse the existing database connection between HMR cycles.
      // By default, TypeORM will wait for old connection to terminate, and will establish a new database connection.
      // This will prevent an error due to double-connection attempt, and speed up the HMR cycles considerably.
      // src: https://github.com/nestjs/nest/issues/711#issuecomment-392028717
      keepConnectionAlive: true,
      cli: {
        entitiesDir: 'src/**/',
      },
    }),
  ],
  controllers: [
    AppController,
    MoviesController,
  ],
})
export class AppModule {}
