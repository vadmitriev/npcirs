import api from '../api/http';
import {
  IOrganization,
  OrganizationResponse,
} from '../interfaces/Organization';
import { AxiosResponse } from 'axios';

const formUrl = (regionId: string, id?: string) => {
  let url = `/regions/${regionId}/organization`;
  if (id) {
    return `${url}/${id}`;
  }
  return url;
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
    return api.put(formUrl(regionId, data.id), data);
  }

  static async delete(regionId: string, id: string) {
    return api.delete(formUrl(regionId, id));
  }
}
