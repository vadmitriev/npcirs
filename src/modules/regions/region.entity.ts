import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'r1022', schema: 'public', timestamps: false })
export class Region extends Model<Region> {
  @ApiProperty({ example: '0100000000', description: 'Код' })
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    primaryKey: true,
  })
  p00: string;

  @ApiProperty({
    example: 'Алтайский край',
    description: 'Наименование',
  })
  @Column({
    type: DataType.STRING(500),
  })
  p01: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(500),
  })
  p02: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(1),
    allowNull: false,
    defaultValue: '0',
  })
  utv: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(1),
  })
  sp: string;
}
