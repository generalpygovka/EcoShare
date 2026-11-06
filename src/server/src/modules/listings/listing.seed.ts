import { Listing } from './listing.entity';

export function createDemoListings(): Listing[] {
    return [
        new Listing(
            'listing-drill',
            'resident-demo',
            'Дриль Bosch',
            'Можу позичити дриль для ремонту.',
            'Інструменти',
            'Гуртожиток №1',
            'available',
        ),

        new Listing(
            'listing-book',
            'resident-demo',
            'Книга з програмування',
            'Книга для вивчення програмування.',
            'Книги',
            'Гуртожиток №2',
            'reserved',
        ),

        new Listing(
            'listing-hidden',
            'resident-demo',
            'Приховане оголошення',
            'Це оголошення не повинно відображатися.',
            'Інше',
            'Гуртожиток №1',
            'hidden',
        ),

        new Listing(
            'listing-closed',
            'resident-demo',
            'Закрите оголошення',
            'Це оголошення вже закрите.',
            'Інше',
            'Гуртожиток №2',
            'closed',
        ),
    ];
}