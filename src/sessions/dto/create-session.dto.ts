import { ApiProperty } from '@nestjs/swagger';
import { TimeSlot } from '../entities/session.entity';
import { Movie } from '../../movies/entities/movie.entity';
import { Auditorium } from '../../auditoriums/entities/auditorium.entity';

export class CreateSessionDto {

  @ApiProperty({
    required: true,
    default: 1,
    description: 'Id of the movie.',
  })
  movie: Movie;

  @ApiProperty({
    required: true,
    default: 1,
    description: 'Name of the movie.',
  })
  auditorium: Auditorium;

  @ApiProperty({
    required: true,
    enum: TimeSlot,
    enumName: 'TimeSlot',
    description: 'Time of the session.',
  })
  timeSlot: TimeSlot;

  @ApiProperty({
    required: true,
    default: '',
    description: 'Name of the movie.',
  })
  date: string;

}
