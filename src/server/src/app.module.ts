import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuthUsersModule } from './modules/auth-users/auth-users.module';
import { ListingsModule } from './modules/listings/listings.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthUsersModule, ListingsModule],
  controllers: [HealthController],
})
export class AppModule {}
