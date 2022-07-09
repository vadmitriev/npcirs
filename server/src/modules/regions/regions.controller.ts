import { RegionDto } from './dto/region.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { IRegionQuery } from './interfaces/regionQuery.interface';
import { RegionsService } from './regions.service';
import { Region } from './region.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('regions')
@Controller('regions')
export class RegionsController {
  constructor(private regionService: RegionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found all records',
    type: Region,
  })
  async findAll(@Body() query: IRegionQuery) {
    return await this.regionService.findAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Region,
  })
  async findOneById(@Param('id') id: string) {
    const region = await this.regionService.findOneById(id);

    if (!region) {
      throw new NotFoundException("This Region doesn't exist");
    }

    return region;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBody({ type: Region })
  @ApiOperation({ summary: 'Create region' })
  async create(@Body() region: RegionDto): Promise<Region> {
    return await this.regionService.create(region);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete region' })
  async delete(@Param('id') id: string) {
    const deleted = await this.regionService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This Region doesn't exist");
    }

    return 'Successfully deleted';
  }
}
