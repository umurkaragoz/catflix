import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { BearerStrategy } from './strategies/bearer.strategy';
import { ManagerGuard } from './guards/manager.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, BearerStrategy, ManagerGuard],
  exports: [AuthService],
})
export class AuthModule {}
