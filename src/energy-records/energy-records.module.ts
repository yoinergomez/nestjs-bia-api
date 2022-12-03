import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergyRecordsService } from './services/energy-records.service';
import { EnergyRecord } from './entities/energy-record.entity';
import { ENERGY_RECORDS_REPOSITORY } from './repositories/energy-records.repository';
import { EnergyRecordsController } from './energy-records.controller';
import { FindByPeriodService } from './services/find-by-period.service';

const energyRecordsServiceClass = {
  provide: ENERGY_RECORDS_REPOSITORY,
  useClass: EnergyRecordsService,
};

@Module({
  providers: [energyRecordsServiceClass, FindByPeriodService],
  imports: [TypeOrmModule.forFeature([EnergyRecord])],
  exports: [energyRecordsServiceClass],
  controllers: [EnergyRecordsController],
})
export class EnergyRecordsModule {}
