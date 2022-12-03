import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';

export enum IntervalTimeDto {
  DAILY = 'daily',
  WEEK = 'weekly',
  MONTH = 'monthly',
}

export type Measures = {
  max: string;
  min: string;
  meter_date: Date;
};

export class FindByDateDto {
  @ApiProperty({ default: '2022-10-25' })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @ApiProperty({ enum: IntervalTimeDto })
  @IsEnum(IntervalTimeDto)
  @IsNotEmpty()
  period: IntervalTimeDto;
}
