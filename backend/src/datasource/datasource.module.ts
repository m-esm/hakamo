import { Module } from '@nestjs/common';
import { DatasourceService } from './datasource.service';
import { DatasourceController } from './datasource.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DatasourceService],
  controllers: [DatasourceController],
  imports: [PrismaModule],
})
export class DatasourceModule {}
