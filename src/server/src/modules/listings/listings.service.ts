import { Inject, Injectable } from '@nestjs/common';
import { AUTH_USERS } from '../auth-users/auth.contract';
import type { IAuthUsers } from '../auth-users/auth.contract';
import { LISTING_REPOSITORY } from './listing.repository';
import type { IListingRepository } from './listing.repository';
import type { IListings, ListingView } from './listings.contract';

@Injectable()
export class ListingsService implements IListings {
  constructor(
    @Inject(LISTING_REPOSITORY) private readonly repository: IListingRepository,
    @Inject(AUTH_USERS) private readonly users: IAuthUsers,
  ) {}

  list(search = ''): ListingView[] {
    const query = search.trim().toLocaleLowerCase('uk');

    return this.repository.findAll().flatMap((item) => {
      if (item.status !== 'available' && item.status !== 'reserved') return [];

      const text = (item.title + ' ' + item.description).toLocaleLowerCase('uk');
      if (query && !text.includes(query)) return [];

      const owner = this.users.findPublicById(item.ownerId);
      return [{
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        dormitory: item.dormitory,
        status: item.status,
        ownerName: owner?.displayName ?? 'Мешканець',
      }];
    });
  }
}