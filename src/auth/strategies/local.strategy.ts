import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* ----------------------------------------------------------------------------------------------------------------------------- Local Strategy -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class LocalStrategy extends PassportStrategy(Strategy) {

  /* ------------------------------------------------------------------------------------------------------------------------------ constructor -+- */
  constructor(private authService: AuthService) {
    // Pass parameters to customize the strategy. e.g.
    // see: http://www.passportjs.org/concepts/authentication/strategies/
    super({ usernameField: 'email' });
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- validate -+- */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateBasic(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
