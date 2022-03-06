import { ApiProperty } from '@nestjs/swagger';

export class CreateAuditoriumDto {

  @ApiProperty({
    required: true,
    default: 'Hall 1',
    description: 'Name of the auditorium.',
  })
  name: string;

}
