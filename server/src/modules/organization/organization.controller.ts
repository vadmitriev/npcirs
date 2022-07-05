import { AuthGuard } from '@nestjs/passport';
import { OrganizationDto } from './dto/organization.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('regions/:regionId/organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.organizationService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('regionId') regionId: string, @Param('id') id: string) {
    const organization = await this.organizationService.findOne(id, regionId);

    if (!organization) {
      throw new NotFoundException("This Organization doesn't exist");
    }

    return organization;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Param('regionId') regionId: string,
    @Body() organization: OrganizationDto,
  ) {
    return await this.organizationService.create({
      ...organization,
      r1022: regionId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.organizationService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This Organization doesn't exist");
    }

    return 'Successfully deleted';
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() organization: OrganizationDto) {
    const updatedItem = await this.organizationService.update(id, organization);

    if (!updatedItem) {
      throw new NotFoundException("This Organization doesn't exist");
    }

    return updatedItem;
  }
}
