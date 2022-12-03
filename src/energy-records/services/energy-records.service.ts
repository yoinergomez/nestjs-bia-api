import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DateUtils } from '../../utils/date.utils';
import { Measures } from '../dto/find-by-date.dto';
import { EnergyRecord } from '../entities/energy-record.entity';
import { EnergyRecordsRepository } from '../repositories/energy-records.repository';

@Injectable()
export class EnergyRecordsService implements EnergyRecordsRepository {
  private dateUtils: DateUtils;

  constructor(
    @InjectRepository(EnergyRecord)
    private energyRecordsRepository: Repository<EnergyRecord>,
  ) {
    this.dateUtils = new DateUtils();
  }

  create(energyRecords: EnergyRecord): Promise<EnergyRecord> {
    return this.energyRecordsRepository.save(energyRecords);
  }

  findAll(): Promise<EnergyRecord[]> {
    return this.energyRecordsRepository.find();
  }

  truncate(): Promise<void> {
    return this.energyRecordsRepository.clear();
  }

  findByDateRange(
    startDate: string,
    endDate: string,
    interval: string,
  ): Promise<Measures[]> {
    const truncateMeterDate = `date_trunc('${interval}', energy_record.meter_date)`;
    const plainWhere = `energy_record.meter_date >= '${startDate}' AND energy_record.meter_date <= '${endDate}'`;
    const aliasTruncate = 'meter_date';
    const plainSelect = `${truncateMeterDate} as ${aliasTruncate}, MAX(energy_record.active_energy) as max, MIN(energy_record.active_energy) as min`;
    return this.energyRecordsRepository
      .createQueryBuilder('energy_record')
      .select(plainSelect)
      .where(plainWhere)
      .groupBy(truncateMeterDate)
      .orderBy(aliasTruncate, 'ASC')
      .getRawMany();
  }
}
