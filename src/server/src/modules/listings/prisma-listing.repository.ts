import type { Prisma, PrismaClient } from '@prisma/client';
import { Listing } from './listing.entity';

export class PrismaListingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findForFeed(search = ''): Promise<readonly Listing[]> {
    const query = search.trim();
    const where: Prisma.ListingWhereInput = {
      status: { in: ['available', 'reserved'] },
    };

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    const rows = await this.prisma.listing.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
      select: {
        id: true,
        ownerId: true,
        title: true,
        description: true,
        status: true,
        category: { select: { name: true } },
        building: {
          select: { dormitory: { select: { name: true } } },
        },
      },
    });

    return rows.map((row) => new Listing(
      row.id,
      row.ownerId,
      row.title,
      row.description,
      row.category.name,
      row.building.dormitory.name,
      row.status,
    ));
  }
}