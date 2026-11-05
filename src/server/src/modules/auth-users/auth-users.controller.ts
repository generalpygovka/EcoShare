import { Controller, Get, Inject } from '@nestjs/common';
import { AUTH_USERS } from './auth.contract';
import type { IAuthUsers } from './auth.contract';

@Controller('users')
export class AuthUsersController {
  constructor(@Inject(AUTH_USERS) private readonly users: IAuthUsers) {}

  @Get('demo')
  demo() {
    return this.users.findPublicById('resident-demo');
  }
}
