import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { DatasourceType } from '@prisma/client';

export class DatasourceDto {
  @ApiProperty()
  @IsString()
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name of the datasource',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose()
  connectionString: string;

  @ApiProperty({ enum: DatasourceType })
  @IsEnum(DatasourceType)
  @Expose()
  type: DatasourceType;
}
