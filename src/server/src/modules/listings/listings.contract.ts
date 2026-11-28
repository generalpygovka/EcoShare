export interface ListingView {
  id: string;
  title: string;
  description: string;
  category: string;
  dormitory: string;
  status: 'available' | 'reserved';
  ownerName: string;
}

export interface IListings {
  list(search?: string): Promise<ListingView[]>;
}

export const LISTINGS = Symbol('LISTINGS');
