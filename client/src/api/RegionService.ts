import api from './http';
import { IRegion, RegionResponse } from '../interfaces/Region';
import { AxiosResponse } from 'axios';

export default class RegionService {
  static async load(): Promise<AxiosResponse<RegionResponse>> {
    return api.get<RegionResponse>('/regions');
  }

  static async create(
    data: IRegion,
  ): Promise<AxiosResponse<IRegion>> {
    return api.post('/regions', data);
  }
}
