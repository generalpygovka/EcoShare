import { Module } from '@nestjs/common';
import { createDemoListings } from './listing.seed';
import { AuthUsersModule } from '../auth-users/auth-users.module';
import { LISTINGS } from './listings.contract';
import { LISTING_REPOSITORY, MemoryListingRepository } from './listing.repository';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';

@Module({
  imports: [AuthUsersModule],
  controllers: [ListingsController],
  providers: [
    {
      provide: LISTING_REPOSITORY,
      useFactory: () => new MemoryListingRepository(createDemoListings()),
    },
    { provide: LISTINGS, useClass: ListingsService },
  ],
  exports: [LISTINGS],
})
export class ListingsModule {}