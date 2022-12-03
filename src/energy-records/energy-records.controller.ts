import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindByDateDto } from './dto/find-by-date.dto';
import { FindByPeriodService } from './services/find-by-period.service';

@ApiTags('EnergyRecords')
@Controller('energy-records')
export class EnergyRecordsController {
  constructor(private readonly findByPeriodService: FindByPeriodService) {}

  @Post()
  async findByDateRange(@Body() dto: FindByDateDto) {
    const x = await this.findByPeriodService.exec(dto);

    return x;
  }
}
