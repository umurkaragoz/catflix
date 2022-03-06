import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth/dto/login.dto';
import { RegisterDto } from './auth/dto/register.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

@Controller()
@ApiTags('Authentication')
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* ----------------------------------------------------------------------------------------------------------------------------- App Controller -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class AppController {

  /* ------------------------------------------------------------------------------------------------------------------------------ constructor -+- */
  constructor(private usersService: UsersService, private authService: AuthService) {}

  /* ------------------------------------------------------------------------------------------------------------------------------------ login -+- */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    type: LoginDto,
  })
  @ApiOperation({
    summary: 'Login using email and password. Retrieve an API token.',
    description: 'Exchange user email-password information for an API token.<br><br>After a successful login, copy the `token` value from the response object, and use it to authenticate all other endpoints.',
  })
  async login(@Req() req) {
    console.log('AppController.login()');
    const user = await this.authService.login(req.user);

    console.log(user);

    return user;
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- register -+- */
  @Post('auth/register')
  @ApiBody({
    type: RegisterDto,
  })
  @ApiOperation({
    summary: 'Register a new user account.',
  })
  async register(@Body() dto: RegisterDto) {
    return this.usersService.register(dto);
  }

}
