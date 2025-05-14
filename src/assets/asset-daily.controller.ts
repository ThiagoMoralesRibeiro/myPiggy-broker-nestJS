import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssetDailyService } from './asset-daily.service';

@Controller('assets/:symbol/dailies')
export class AssetsDailiesController {
  constructor(private assetsDailyService: AssetDailyService) {}

  @Get()
  findAll(@Param('symbol') symbol: string) {
    return this.assetsDailyService.findAll(symbol);
  }

  @Post()
  create(
    @Body() dto: { date: string; price: number },
    @Param('symbol') symbol: string,
  ) {
    return this.assetsDailyService.create({
      symbol,
      date: new Date(dto.date),
      price: dto.price,
    });
  }
}
