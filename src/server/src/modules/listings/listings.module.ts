import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUsersModule } from '../auth-users/auth-users.module';
import { LISTINGS } from './listings.contract';
import { LISTING_REPOSITORY } from './listing.repository';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { PrismaListingRepository } from './prisma-listing.repository';

@Module({
  imports: [PrismaModule, AuthUsersModule],
  controllers: [ListingsController],
  providers: [
    {
      provide: LISTING_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaListingRepository(prisma),
      inject: [PrismaService],
    },
    { provide: LISTINGS, useClass: ListingsService },
  ],
  exports: [LISTINGS],
})
export class ListingsModule {}