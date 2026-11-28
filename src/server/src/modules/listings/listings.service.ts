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

  async list(search = ''): Promise<ListingView[]> {
    const candidates = await this.repository.findForFeed(search);

    const owners = await this.users.findPublicByIds(
      candidates.map((item) => item.ownerId),
    );

    const names = new Map(owners.map((owner) => [owner.id, owner.displayName]));

    return candidates.flatMap((item) => {
      if (item.status !== 'available' && item.status !== 'reserved') return [];
      return [{
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        dormitory: item.dormitory,
        status: item.status,
        ownerName: names.get(item.ownerId) ?? 'Мешканець',
      }];
    });
  }
}
