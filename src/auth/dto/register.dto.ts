import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../../users/entities/user.entity';

export class RegisterDto {

  @ApiProperty({
    required: true,
    default: 'j.doe@gmail.com',
    description: 'Email address of the user. Will be used to log-in.',
  })
  email: string;


  @ApiProperty({
    required: true,
    default: '123',
    description: 'Password to be used while logging in.',
  })
  password: string;


  @ApiProperty({
    required: true,
    default: 15,
    description: 'Age of the user.',
  })
  age: number;


  @ApiProperty({
    required: true,
    default: 'John',
    description: 'First name of the user.',
  })
  firstName: string;


  @ApiProperty({
    required: false,
    default: 'Doe',
    description: 'password',
  })
  lastName: string;

  @ApiProperty({
    required: true,
    enum: UserType,
    default: UserType.CUSTOMER,
    description: 'Type of the user.',
  })
  type: UserType;

}
