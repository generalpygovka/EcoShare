export type ListingStatus = 'available' | 'reserved' | 'closed' | 'hidden';

export class Listing {
  public readonly title: string;

  constructor(
    public readonly id: string,
    public readonly ownerId: string,
    title: string,
    public readonly description: string,
    public readonly category: string,
    public readonly dormitory: string,
    public readonly status: ListingStatus = 'available',
  ) {
    this.title = title.trim();
    if (this.title.length < 3 || this.title.length > 80) {
      throw new Error('Назва повинна містити від 3 до 80 символів');
    }
  }
}