import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({
    required: true,
    default: 'j.doe@gmail.com',
    description: 'Email address of the user.',
  })
  email: string;


  @ApiProperty({
    required: true,
    default: '123',
    description: 'User password',
  })
  password: string;

}
