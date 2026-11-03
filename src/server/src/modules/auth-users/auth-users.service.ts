import { Injectable } from '@nestjs/common';
import type { IAuthUsers, PublicUser } from './auth.contract';
import { Resident } from './user.entity';

@Injectable()
export class AuthUsersService implements IAuthUsers {
  private readonly demo = new Resident(
    'resident-demo',
    'Демо мешканець',
    'demo@edu.kpi.ua',
    '1',
    '@ecoshare_demo',
  );

  findPublicById(id: string): PublicUser | undefined {
    if (id !== this.demo.id) return undefined;

    return {
      id: this.demo.id,
      displayName: this.demo.getDisplayName(),
      dormitory: this.demo.dormitory,
    };
  }
}
