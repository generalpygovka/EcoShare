import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AUTH_USERS } from './auth.contract';
import { AuthUsersController } from './auth-users.controller';
import { AuthUsersService } from './auth-users.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthUsersController],
  providers: [{ provide: AUTH_USERS, useClass: AuthUsersService }],
  exports: [AUTH_USERS],
})
export class AuthUsersModule {}
