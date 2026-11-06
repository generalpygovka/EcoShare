import type { ListingView } from './types';

export async function getListings(search = ''): Promise<ListingView[]> {
  const params = new URLSearchParams({ search });
  const response = await fetch('/api/listings?' + params.toString());

  if (!response.ok) {
    throw new Error('Не вдалося отримати оголошення. Код: ' + response.status);
  }

  return response.json();
}
