import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  Index,
  BelongsTo,
} from 'sequelize-typescript';
import { Region } from '../regions/region.entity';

@Table({ tableName: 'mpe1gem', schema: 'minzdrav' })
export class Organization extends Model<Organization> {
  @Column({
    type: DataType.INTEGER,
  })
  npp: number;

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

  @Column({
    type: DataType.STRING(1000),
  })
  naim_org: string;

  @Column({
    type: DataType.STRING(1000),
  })
  adr_fact: string;

  @Column({
    type: DataType.STRING(100),
  })
  inn: string;

  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  plazma_max: string;

  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  plazma_cena: number;

  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  erm_max: number;

  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  erm_cena: number;

  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  immg_max: number;

  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  immg_cena: number;

  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  alb_max: number;

  @Column({
    type: DataType.DECIMAL(17, 6),
  })
  alb_cena: number;

  @BelongsTo(() => Region)
  region: Region;
}
