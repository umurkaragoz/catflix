import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* ---------------------------------------------------------------------------------------------------------------------------- Bearer Strategy -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {

  /* ------------------------------------------------------------------------------------------------------------------------------ constructor -+- */
  constructor(private authService: AuthService) {
    super();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- validate -+- */
  async validate(token: string): Promise<any> {
    const user = await this.authService.validateBearer(token);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
