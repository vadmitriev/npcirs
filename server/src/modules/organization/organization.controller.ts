import { Organization } from 'src/modules/organization/organization.entity';
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { OrganizationService } from './organization.service';
import { REGION_ID_COL_NAME } from './constants';

@ApiBearerAuth()
@ApiTags('organizations')
@Controller('regions/:regionId/organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
    description: 'The found all records',
    type: Organization,
  })
  async findAll(@Param('regionId') regionId: string) {
    return await this.organizationService.findAll(regionId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Get organization' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Organization,
  })
  async findOne(@Param('regionId') regionId: string, @Param('id') id: string) {
    const organization = await this.organizationService.findOne(id, regionId);

    if (!organization) {
      throw new NotFoundException("This Organization doesn't exist");
    }

    return organization;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create organization' })
  @ApiBody({ type: Organization })
  async create(
    @Param('regionId') regionId: string,
    @Body() organization: OrganizationDto,
  ) {
    return await this.organizationService.create({
      ...organization,
      [REGION_ID_COL_NAME]: regionId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete organization' })
  async delete(@Param('id') id: string) {
    const deleted = await this.organizationService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This Organization doesn't exist");
    }

    return 'Successfully deleted';
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Update organization' })
  async update(@Param('id') id: string, @Body() organization: OrganizationDto) {
    const updatedItem = await this.organizationService.update(id, organization);

    if (!updatedItem) {
      throw new NotFoundException("This Organization doesn't exist");
    }

    return updatedItem;
  }
}
