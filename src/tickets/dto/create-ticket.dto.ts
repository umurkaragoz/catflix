import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {

  @ApiProperty({
    required: true,
    default: 1,
    description: 'ID of the session.',
  })
  sessionId: number;

  @ApiProperty({
    required: true,
    default: 1,
    description: 'ID of the user.',
  })
  userId: number;


  @ApiProperty({
    default: false,
    description: 'Whether the ticket was used.',
  })
  is_watched: boolean;

}
