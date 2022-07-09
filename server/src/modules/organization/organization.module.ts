import { OrganizationService } from './organization.service';
import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { organizationsProviders } from './organization.providers';

@Module({
  providers: [OrganizationService, ...organizationsProviders],
  exports: [OrganizationService],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
