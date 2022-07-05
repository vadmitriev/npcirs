import { RegionDto } from './dto/region.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { IRegionQuery } from './interfaces/regionQuery.interface';
import { RegionsService } from './regions.service';
import { Region } from './region.entity';

@Controller('regions')
export class RegionsController {
  constructor(private regionService: RegionsService) {}

  @Get()
  async findAll(@Body() query: IRegionQuery) {
    return await this.regionService.findAll(query);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const region = await this.regionService.findOneById(id);

    if (!region) {
      throw new NotFoundException("This Region doesn't exist");
    }

    return region;
  }

  @Post()
  async create(@Body() region: RegionDto): Promise<Region> {
    return await this.regionService.create(region);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.regionService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This Region doesn't exist");
    }

    return 'Successfully deleted';
  }
}
