import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatasourceDto } from './datasource.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DatasourceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDatasources(): Promise<DatasourceDto[]> {
    const items = await this.prismaService.datasource.findMany();

    return items.map((item) => plainToInstance(DatasourceDto, item));
  }

  async getDatasource(datasourceId: string): Promise<DatasourceDto> {
    const item = await this.prismaService.datasource.findUnique({
      where: { id: datasourceId },
    });

    return plainToInstance(DatasourceDto, item);
  }

  async createDatasource(datasourceDto: DatasourceDto): Promise<DatasourceDto> {
    const item = await this.prismaService.datasource.create({
      data: datasourceDto,
    });

    return plainToInstance(DatasourceDto, item);
  }

  async updateDatasource(
    datasourceId: string,
    datasourceDto: DatasourceDto,
  ): Promise<DatasourceDto> {
    const item = await this.prismaService.datasource.update({
      where: { id: datasourceId },
      data: datasourceDto,
    });

    return plainToInstance(DatasourceDto, item);
  }

  async deleteDatasource(datasourceId: string): Promise<void> {
    await this.prismaService.datasource.delete({
      where: { id: datasourceId },
    });
  }
}
