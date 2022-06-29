import {} from 'class-validator';

export class OrganizationDto {
  readonly npp: number;

  readonly r1022: string;

  readonly naim_org: string;
  readonly adr_fact: string;
  readonly inn: string;
  readonly plazma_max: string;
  readonly plazma_cena: number;
  readonly erm_max: number;
  readonly erm_cena: number;
  readonly immg_max: number;
  readonly immg_cena: number;
  readonly alb_max: number;
  readonly alb_cena: number;
}
