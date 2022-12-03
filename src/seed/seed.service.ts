import { Inject, Injectable } from '@nestjs/common';

import { EnergyRecord } from '../energy-records/entities/energy-record.entity';
import {
  EnergyRecordsRepository,
  ENERGY_RECORDS_REPOSITORY,
} from '../energy-records/repositories/energy-records.repository';
import { dataSource } from './config/data-source';

@Injectable()
export class SeedService {
  constructor(
    @Inject(ENERGY_RECORDS_REPOSITORY)
    private readonly energyRecordsRepository: EnergyRecordsRepository,
  ) {}

  async create() {
    await this.energyRecordsRepository.truncate();
    const promises = dataSource.map((energyRecord) =>
      this.energyRecordsRepository.create({
        ...energyRecord,
        meter_date: new Date(energyRecord.meter_date),
      } as EnergyRecord),
    );
    return Promise.all(promises);
  }

  findAll() {
    return this.energyRecordsRepository.findByDateRange(
      '2022-10-26',
      '2022-10-27',
      'hour',
    );
  }
}
