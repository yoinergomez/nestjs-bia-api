import { Test, TestingModule } from '@nestjs/testing';
import { EnergyRecordsController } from './energy-records.controller';
import { ENERGY_RECORDS_REPOSITORY } from './repositories/energy-records.repository';
import { FindByPeriodService } from './services/find-by-period.service';

describe('EnergyRecordsController', () => {
  let controller: EnergyRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnergyRecordsController],
      providers: [
        FindByPeriodService,
        {
          provide: ENERGY_RECORDS_REPOSITORY,
          useValue: () => ({}),
        },
      ],
    }).compile();

    controller = module.get<EnergyRecordsController>(EnergyRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
