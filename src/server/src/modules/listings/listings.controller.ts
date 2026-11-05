import { BadRequestException, Controller, Get, Inject, Query } from '@nestjs/common';
import { LISTINGS } from './listings.contract';
import type { IListings } from './listings.contract';

@Controller('listings')
export class ListingsController {
  constructor(@Inject(LISTINGS) private readonly listings: IListings) {}

  @Get()
  list(@Query('search') search?: unknown) {
    if (search !== undefined && typeof search !== 'string') {
      throw new BadRequestException('search повинен бути одним текстовим значенням');
    }
    return this.listings.list(search);
  }
}