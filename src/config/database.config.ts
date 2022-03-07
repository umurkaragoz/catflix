import { User } from '../users/entities/user.entity';
import { Movie } from '../movies/entities/movie.entity';
import { Session } from '../sessions/entities/session.entity';
import { Auditorium } from '../auditoriums/entities/auditorium.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, Movie, Session, Auditorium, Ticket],
  // Reuse the existing database connection between HMR cycles.
  // By default, TypeORM will wait for old connection to terminate, and will establish a new database connection.
  // This will prevent an error due to double-connection attempt, and speed up the HMR cycles considerably.
  // src: https://github.com/nestjs/nest/issues/711#issuecomment-392028717
  keepConnectionAlive: true,
};


export = databaseConfig;
