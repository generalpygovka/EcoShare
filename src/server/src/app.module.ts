import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuthUsersModule } from './modules/auth-users/auth-users.module';

@Module({
  imports: [AuthUsersModule],
  controllers: [HealthController],
})
export class AppModule {}
