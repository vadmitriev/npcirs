import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { IRegionQuery } from './interfaces/regionQuery.interface';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private regionService: RegionsService) {}

  @Get()
  async findAll(@Body() query: IRegionQuery) {
    return await this.regionService.findAll(query);
  }
}
