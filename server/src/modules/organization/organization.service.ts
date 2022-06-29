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
    return await this.organizationRepository.create<Organization>(organization);
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.findAll();
  }

  async findOneById(id: string): Promise<Organization> {
    return await this.organizationRepository.findOne<Organization>({
      where: { id },
    });
  }
}
