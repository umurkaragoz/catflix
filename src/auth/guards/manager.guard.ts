import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User, UserType } from '../../users/entities/user.entity';

@Injectable()
export class ManagerGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return user.type === UserType.MANAGER;
  }
}
