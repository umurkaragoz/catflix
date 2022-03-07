import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

const crypto = require('crypto');

@Injectable()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------- Auth Service -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class AuthService {

  constructor(private usersService: UsersService) {}

  /* ---------------------------------------------------------------------------------------------------------------------------- validate User -+- */
  async validateBasic(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);

    if (!match) return null;

    return user;
  }

  /* ---------------------------------------------------------------------------------------------------------------------------- validate User -+- */
  async validateBearer(token: string): Promise<any> {
    return await this.usersService.findOneByToken(token);
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------ login -+- */
  async login(user: User) {
    // Generate new bearer token.
    // This will be used to authenticate the user.
    user.token = crypto.randomBytes(32).toString('hex');

    // Update the user to persist the created/refreshed token.
    return await this.usersService.save(user);
  }

}
