import { Module } from '@nestjs/common';

import { EnergyRecordsModule } from '../energy-records/energy-records.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [EnergyRecordsModule],
})
export class SeedModule {}
