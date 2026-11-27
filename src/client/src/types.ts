export interface ListingView {
  id: string;
  title: string;
  description: string;
  category: string;
  dormitory: string;
  status: 'available' | 'reserved';
  ownerName: string;
}