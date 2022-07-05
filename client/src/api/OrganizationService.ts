import api from './http';
import {
  IOrganization,
  OrganizationResponse,
} from '../interfaces/Organization';
import { AxiosResponse } from 'axios';

const formUrl = (regionId: string) => {
  return `/regions/${regionId}/organization`;
};

export default class OrganizationService {
  static async load(
    regionId: string,
  ): Promise<AxiosResponse<OrganizationResponse>> {
    return api.get(formUrl(regionId));
  }

  static async create(
    regionId: string,
    data: IOrganization,
  ): Promise<AxiosResponse<IOrganization>> {
    return api.post<IOrganization>(formUrl(regionId), data);
  }

  static async update(
    regionId: string,
    data: IOrganization,
  ): Promise<AxiosResponse<IOrganization>> {
    return api.put(formUrl(regionId), data);
  }

  static async delete(regionId: string, id: string) {
    return api.delete(formUrl(regionId), { data: { id } });
  }
}
