import { ListingView } from './types';

export const mockListings: ListingView[] = [
  {
    id: '1',
    title: 'Будівельний дриль Bosch',
    category: 'Техніка',
    dormitory: 'Гуртожиток №4',
    status: 'Доступно',
    condition: 'Робочий стан',
    description: 'Користувався під час ремонту кімнати, більше не потрібен.',
  },
  {
    id: '2',
    title: 'Підручник з вищої математики',
    category: 'Навчальні матеріали',
    dormitory: 'Гуртожиток №4',
    status: 'Заброньовано',
    condition: 'Добрий',
    description: 'Видання 2023 року, без поміток ручкою.',
  },
];
