import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { IAuthUsers, PublicUser } from './auth.contract';

@Injectable()
export class AuthUsersService implements IAuthUsers {
  constructor(private readonly prisma: PrismaService) {}

  async findPublicById(id: string): Promise<PublicUser | undefined> {
    const users = await this.findPublicByIds([id]);
    return users[0];
  }

  async findPublicByIds(ids: readonly string[]): Promise<PublicUser[]> {
    const uniqueIds = [...new Set(ids)];
    if (uniqueIds.length === 0) return [];

    const records = await this.prisma.user.findMany({
      where: { id: { in: uniqueIds } },
      select: {
        id: true,
        displayName: true,
        building: {
          select: { dormitory: { select: { name: true } } },
        },
      },
    });

    return records.map((user) => ({
      id: user.id,
      displayName: user.displayName,
      dormitory: user.building.dormitory.name,
    }));
  }
}
