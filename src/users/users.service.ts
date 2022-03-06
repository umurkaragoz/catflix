import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ Users Service -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class UsersService {

  /* ------------------------------------------------------------------------------------------------------------------------------ constructor -+- */
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  async findOne(index: number): Promise<User> {
    return await this.userRepo.findOne(index);
  }

  /* ------------------------------------------------------------------------------------------------------------------------ find One By Email -+- */
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  /* ------------------------------------------------------------------------------------------------------------------------ find One By Token -+- */
  async findOneByToken(token: string): Promise<User> {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.token = :token', { token })
      .getOne();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- register -+- */
  async register(dto: RegisterDto) {
    return this.userRepo.save({
      ...dto,
      password: await bcrypt.hash(dto.password, 12),
    });
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------- save -+- */
  async save(user: User) {
    return await this.userRepo.save(user);
  }
}
