import { Controller, Get } from '@nestjs/common';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
	constructor(private regionService: RegionsService) {}

	@Get()
	async findAll() {
		return await this.regionService.findAll();
	}
}
