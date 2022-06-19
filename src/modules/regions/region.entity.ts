import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'r1022', timestamps: false })
export class Region extends Model<Region> {
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    primaryKey: true,
  })
  p00: string;

  @Column({
    type: DataType.STRING(500),
  })
  p01: string;

  @Column({
    type: DataType.STRING(500),
  })
  p02: string;

  @Column({
    type: DataType.STRING(1),
    allowNull: false,
    defaultValue: '0',
  })
  utv: string;

  @Column({
    type: DataType.STRING(1),
  })
  sp: string;
}
