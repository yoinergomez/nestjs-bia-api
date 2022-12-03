import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EnergyRecordsService } from '../energy-records.service';
import { EnergyRecord } from '../../entities/energy-record.entity';

describe('EnergyRecordsService', () => {
  let service: EnergyRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnergyRecordsService,
        {
          provide: getRepositoryToken(EnergyRecord),
          useValue: () => ({}),
        },
      ],
    }).compile();

    service = module.get<EnergyRecordsService>(EnergyRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
