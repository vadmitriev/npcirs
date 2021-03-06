export interface IOrganization {
  id?: string;
  npp: number;
  r1022: string;
  naim_org: string;
  adr_fact: string;
  inn: string;
  plazma_max: number;
  plazma_cena: number;
  erm_max: number;
  erm_cena: number;
  immg_max: number;
  immg_cena: number;
  alb_max: number;
  alb_cena: number;
}

export interface OrganizationResponse {
  count: number;
  data: IOrganization[];
}
