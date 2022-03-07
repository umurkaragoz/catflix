import { ApiProperty } from '@nestjs/swagger';
import { TimeSlot } from '../entities/session.entity';
import { Movie } from '../../movies/entities/movie.entity';

export class CreateSessionDto {

  @ApiProperty({
    required: true,
    default: 1,
    description: 'ID of the movie.',
  })
  movieId: number;

  @ApiProperty({
    required: true,
    default: 1,
    description: 'ID of the auditorium.',
  })
  auditoriumId: number;

  @ApiProperty({
    required: true,
    enum: TimeSlot,
    enumName: 'TimeSlot',
    description: 'Time of the session.',
  })
  timeSlot: TimeSlot;

  @ApiProperty({
    required: true,
    default: '2022-02-17',
    description: 'Date of the session. Format: Y-m-d.',
  })
  date: string;

}
