import { Inject, Injectable } from '@nestjs/common';
import { Organization } from './organization.entity';
import { OrganizationDto } from './dto/organization.dto';
import { ORGANIZATION_REPOSITORY } from 'src/core/constants';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY)
    private readonly organizationRepository: typeof Organization,
  ) {}

  async create(organization: OrganizationDto): Promise<Organization> {
    const rowCount = await this.getRowCount();
    return await this.organizationRepository.create<Organization>({
      ...organization,
      npp: rowCount + 1,
    });
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.findAll();
  }

  async findOne(id: string, regionId): Promise<Organization> {
    return await this.organizationRepository.findOne<Organization>({
      where: { id, r1022: regionId },
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

  async getRowCount(): Promise<number> {
    return await this.organizationRepository.count();
  }
}
