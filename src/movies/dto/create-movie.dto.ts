import { ApiProperty } from '@nestjs/swagger';
import { Session, TimeSlot } from '../../sessions/entities/session.entity';

export class CreateMovieDto {

  @ApiProperty({
    required: true,
    default: '',
    description: 'Name of the movie.',
  })
  name: string;


  @ApiProperty({
    required: true,
    default: 18,
    description: 'Minimum permitted audience age.',
  })
  minAge: number;


  @ApiProperty({
    default: '',
    description: 'Description of the movie.',
  })
  description: string;


  @ApiProperty({
    type: [Session],
    default: [{ auditorium: 1, timeSlot: TimeSlot.TS16, date: '2022-03-14' }],
  })
  sessions: Promise<Session[]>;

}
