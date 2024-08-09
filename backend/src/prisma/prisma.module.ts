import { Module, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    PrismaService,
    {
      provide: Logger,
      useValue: new Logger('PrismaService'),
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
