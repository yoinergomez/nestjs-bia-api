import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { EnergyRecordsModule } from './energy-records/energy-records.module';

const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    SeedModule,
    EnergyRecordsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: isProduction,
      extra: {
        ssl: isProduction ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
  ],
})
export class AppModule {}
