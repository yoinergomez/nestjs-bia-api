import { Measures } from '../dto/find-by-date.dto';
import { EnergyRecord } from '../entities/energy-record.entity';

export interface EnergyRecordsRepository {
  create(energyRecords: EnergyRecord): Promise<EnergyRecord>;
  findAll(): Promise<EnergyRecord[]>;
  truncate(): Promise<void>;
  findByDateRange(
    startDate: string,
    endDate: string,
    interval: string,
  ): Promise<Measures[]>;
}

export const ENERGY_RECORDS_REPOSITORY = 'EnergyRecordsRepository';
