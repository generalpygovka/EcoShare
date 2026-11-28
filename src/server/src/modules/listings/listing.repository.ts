import type { Listing } from './listing.entity';

export interface IListingRepository {
  findForFeed(search?: string): Promise<readonly Listing[]>;
}

export const LISTING_REPOSITORY = Symbol('LISTING_REPOSITORY');