export interface IRegion {
  p00: string;
  p01: string;
  p02: string;
  utv: string;
  sp: string;
}

export interface RegionResponse {
  count: number;
  data: IRegion[];
}
