import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { regionsProviders } from './regions.providers';
import { RegionsController } from './regions.controller';

@Module({
  providers: [RegionsService, ...regionsProviders],
  exports: [RegionsService],
  controllers: [RegionsController],
})
export class RegionsModule {}
