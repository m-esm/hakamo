import { Module } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { EmbeddingController } from './embedding.controller';

@Module({
  providers: [EmbeddingService],
  controllers: [EmbeddingController]
})
export class EmbeddingModule {}
