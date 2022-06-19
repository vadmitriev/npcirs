import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { regionProviders } from './regions.providers';
import { RegionsController } from './regions.controller';

@Module({
  providers: [RegionsService, ...regionProviders],
  exports: [RegionsService],
  controllers: [RegionsController],
})
export class RegionsModule {}
