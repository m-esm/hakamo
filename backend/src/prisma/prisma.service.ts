import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('database.url'),
        },
      },
      log:
        configService.get<string>('environment') === 'development'
          ? [
              // { emit: 'event', level: 'query' as Prisma.LogLevel },
              { emit: 'event', level: 'error' },
              { emit: 'event', level: 'info' },
              { emit: 'event', level: 'warn' },
            ]
          : [
              { emit: 'event', level: 'error' },
              { emit: 'event', level: 'warn' },
            ],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    this.logger.verbose('Connecting to database...');
    await this.$connect();
  }

  async onModuleDestroy() {
    this.logger.verbose('Disconnecting from database...');
    await this.$disconnect();
  }
}
