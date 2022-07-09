import { IsNotEmpty } from 'class-validator';

export class RegionDto {
  @IsNotEmpty()
  readonly p00: string;

  readonly p01: string;

  readonly p02: string;

  @IsNotEmpty()
  readonly utv: string;

  readonly sp: string;
}
