export interface ListingView {
  id: string;
  title: string;
  category: string;
  dormitory: string;
  status: 'Доступно' | 'Заброньовано' | 'Передано';
  condition: string;
  description: string;
  photoUrl?: string;
}
