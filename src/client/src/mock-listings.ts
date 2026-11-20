import type { ListingView } from './types';

export const mockListings: ListingView[] = [
  {
    id: 'listing-drill',
    title: 'Дриль Bosch',
    description: 'Можу позичити дриль для ремонту.',
    category: 'Інструменти',
    dormitory: 'Гуртожиток №1',
    status: 'available',
    ownerName: 'Демо мешканець',
  },
  {
    id: 'listing-book',
    title: 'Книга з програмування',
    description: 'Книга для вивчення програмування.',
    category: 'Книги',
    dormitory: 'Гуртожиток №2',
    status: 'reserved',
    ownerName: 'Демо мешканець',
  },
];