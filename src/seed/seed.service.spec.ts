import { Test, TestingModule } from '@nestjs/testing';
import { ENERGY_RECORDS_REPOSITORY } from '../energy-records/repositories/energy-records.repository';
import { SeedService } from './seed.service';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: ENERGY_RECORDS_REPOSITORY,
          useValue: () => ({}),
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
