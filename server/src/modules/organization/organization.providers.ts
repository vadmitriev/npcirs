import { Organization } from './organization.entity';
import { ORGANIZATION_REPOSITORY } from 'src/core/constants';

export const organizationsProviders = [
  {
    provide: ORGANIZATION_REPOSITORY,
    useValue: Organization,
  },
];
