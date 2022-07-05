import { IRegionQuery } from './interfaces/regionQuery.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Region } from './region.entity';
import { RegionDto } from './dto/region.dto';
import { REGION_REPOSITORY } from 'src/core/constants';
import { Op, where, fn, col } from 'sequelize';
import { ID_COL_NAME } from './constants';
@Injectable()
export class RegionsService {
  defaultQuery: IRegionQuery = {
    startsWith: [0, 13],
    length: 10,
  };

  constructor(
    @Inject(REGION_REPOSITORY) private readonly regionRepository: typeof Region,
  ) {}

  async create(region: RegionDto): Promise<Region> {
    return await this.regionRepository.create<Region>(region);
  }

  async findAll(query: IRegionQuery = this.defaultQuery): Promise<Region[]> {
    if (!query || !Object.keys(query).length) {
      return await this.regionRepository.findAll();
    }

    const params = {};
    params[Op.and] = [];

    if (query.length) {
      params[Op.and].push(
        where(fn('char_length', col(ID_COL_NAME)), query.length),
      );
    }

    if (query.startsWith?.length) {
      params[Op.and].push({
        [Op.or]: query.startsWith.map((text) => ({
          [ID_COL_NAME]: { [Op.startsWith]: text },
        })),
      });
    }

    return await this.regionRepository.findAll({
      where: params,
    });
  }

  async findOneById(id: string): Promise<Region> {
    return await this.regionRepository.findOne<Region>({
      where: { [ID_COL_NAME]: id },
    });
  }

  async delete(id: string) {
    return await this.regionRepository.destroy({
      where: { [ID_COL_NAME]: id },
    });
  }
}
