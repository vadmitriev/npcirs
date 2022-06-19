import { Inject, Injectable } from '@nestjs/common';
import { Region } from './region.entity';
import { RegionDto } from './dto/region.dto';
import { REGION_REPOSITORY } from 'src/core/constants';

@Injectable()
export class RegionsService {
  constructor(
    @Inject(REGION_REPOSITORY) private readonly regionRepository: typeof Region,
  ) {}

  async create(region: RegionDto): Promise<Region> {
    return await this.regionRepository.create<Region>(region);
  }

  async findAll(): Promise<Region[]> {
    return await this.regionRepository.findAll();
  }

  async findOneById(id: string): Promise<Region> {
    return await this.regionRepository.findOne<Region>({ where: { p00: id } });
  }
}
