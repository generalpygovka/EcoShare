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
  list(search?: string): ListingView[];
}

export const LISTINGS = Symbol('LISTINGS');