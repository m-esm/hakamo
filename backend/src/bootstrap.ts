import { Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as express from 'express';

import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  const configService = await app.resolve(ConfigService);
  const port = configService.get('port');

  const corsOptions: CorsOptions = {
    origin: configService.get('cors.origin'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Origin, X-Requested-With',
  };

  app.enableCors(corsOptions);

  const logger = new Logger('Bootstrap');
  logger.log('Application is starting...');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hakamo API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  // Expose swagger.json file
  const swaggerJsonPath = join(process.cwd(), 'public', 'swagger.json');
  writeFileSync(swaggerJsonPath, JSON.stringify(document, null, 2));
  logger.log(`Swagger JSON written to ${swaggerJsonPath}`);

  // Serve the public folder
  app.use('/', express.static(join(process.cwd(), 'public')));

  await app.listen(port);

  logger.log(`Application is running on http://localhost:${port}`);
}
