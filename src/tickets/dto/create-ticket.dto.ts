import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Movie } from '../../movies/entities/movie.entity';
import { Auditorium } from '../../auditoriums/entities/auditorium.entity';
import { Session, TimeSlot } from '../../sessions/entities/session.entity';
import { User } from '../../users/entities/user.entity';

export class CreateTicketDto {

  @ApiProperty({
    required: true,
    default: 1,
    description: 'Id of the session.',
  })
  session: Session;

  @ApiProperty({
    required: true,
    default: 1,
    description: 'Id of the user.',
  })
  user: User;

  @ApiProperty({
    default: false,
    description: 'Whether the ticket was used.',
  })
  is_watched: boolean;

}
