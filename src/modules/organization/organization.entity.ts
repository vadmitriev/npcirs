import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Region } from '../regions/region.entity';

import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'mpe1gem', schema: 'minzdrav' })
export class Organization extends Model<Organization> {
  @ApiProperty({ example: '1', description: 'Порядковый номер' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  npp: number;

  @ApiProperty({ example: '0100000000', description: 'Код региона' })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    references: {
      model: {
        schema: 'public',
        tableName: 'r1022',
      },
      key: 'p00',
    },
  })
  r1022: string;

  @ApiProperty({ description: 'Название организации' })
  @Column({
    type: DataType.STRING(1000),
  })
  naim_org: string;

  @ApiProperty({ description: 'Фактический адрес' })
  @Column({
    type: DataType.STRING(1000),
  })
  adr_fact: string;

  @ApiProperty({ example: '5678012401', description: 'ИНН' })
  @Column({
    type: DataType.STRING(100),
  })
  inn: string;

  @ApiProperty({ description: 'Плазма макс' })
  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  plazma_max: string;

  @ApiProperty({ description: 'Плазма цена' })
  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  plazma_cena: number;

  @ApiProperty({ description: 'Эр масса макс' })
  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  erm_max: number;

  @ApiProperty({ description: 'Эр масса цена' })
  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  erm_cena: number;

  @ApiProperty({ description: 'Им макс' })
  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  immg_max: number;

  @ApiProperty({ description: 'Им цена' })
  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  immg_cena: number;

  @ApiProperty({ description: 'Альб макс' })
  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  alb_max: number;

  @ApiProperty({ description: 'Альб цена' })
  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  alb_cena: number;

  @BelongsTo(() => Region)
  region: Region;
}
