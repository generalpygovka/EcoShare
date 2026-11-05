import { Listing } from './listing.entity';

export interface IListingRepository {
  findAll(): readonly Listing[];
}

export const LISTING_REPOSITORY = Symbol('LISTING_REPOSITORY');

export class MemoryListingRepository implements IListingRepository {
  constructor(private readonly items: readonly Listing[] = []) {}

  findAll(): readonly Listing[] {
    return [...this.items];
  }
}