import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', project: 'EcoShare', database: 'ok', storage: 'postgresql'  };
    } catch {
      throw new ServiceUnavailableException('PostgreSQL недоступний');
    }
  }
}
