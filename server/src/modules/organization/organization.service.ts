import { Inject, Injectable } from '@nestjs/common';
import { Organization } from './organization.entity';
import { OrganizationDto } from './dto/organization.dto';
import { ORGANIZATION_REPOSITORY } from 'src/core/constants';
import { REGION_ID_COL_NAME } from './constants';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY)
    private readonly organizationRepository: typeof Organization,
  ) {}

  async create(organization: OrganizationDto): Promise<Organization> {
    return await this.organizationRepository.create<Organization>(organization);
  }

  async findAll(
    regionId: string,
  ): Promise<{ count: number; data: Organization[] }> {
    const data = await this.organizationRepository.findAll({
      where: { [REGION_ID_COL_NAME]: regionId },
    });
    const count = await this.getRowCount(regionId);

    return {
      count,
      data,
    };
  }

  async findOne(id: string, regionId: string): Promise<Organization> {
    return await this.organizationRepository.findOne<Organization>({
      where: { id, [REGION_ID_COL_NAME]: regionId },
    });
  }

  async update(id: string, data: OrganizationDto): Promise<Organization> {
    return await this.organizationRepository
      .update(data, { where: { id } })
      .then(() => this.organizationRepository.findOne({ where: { id } }));
  }

  async delete(id: string) {
    return await this.organizationRepository.destroy({ where: { id } });
  }

  async getRowCount(regionId?: string): Promise<number> {
    if (!regionId) {
      return await this.organizationRepository.count();
    }

    return await this.organizationRepository.count({
      where: { [REGION_ID_COL_NAME]: regionId },
    });
  }
}
