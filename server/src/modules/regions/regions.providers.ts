import { Region } from './region.entity';
import { REGION_REPOSITORY } from 'src/core/constants';

export const regionsProviders = [
  {
    provide: REGION_REPOSITORY,
    useValue: Region,
  },
];
