import { Controller, Get, Inject, NotFoundException } from '@nestjs/common';
import { AUTH_USERS } from './auth.contract';
import type { IAuthUsers } from './auth.contract';

@Controller('users')
export class AuthUsersController {
  constructor(@Inject(AUTH_USERS) private readonly users: IAuthUsers) {}

  @Get('demo')
  async demo() {
    const user = await this.users.findPublicById('resident-demo');
    if (!user) throw new NotFoundException('Демо-користувача не знайдено');
    return user;
  }
}
