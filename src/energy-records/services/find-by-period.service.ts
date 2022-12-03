import { Inject, Injectable } from '@nestjs/common';
import { Decimal } from 'decimal.js';

import { DateUtils } from '../../utils/date.utils';
import { FindByDateDto, Measures } from '../dto/find-by-date.dto';
import {
  EnergyRecordsRepository,
  ENERGY_RECORDS_REPOSITORY,
} from '../repositories/energy-records.repository';

type RangeDates = {
  startDate: Date;
  endDate: Date;
  periodOperation: string;
};

type FindByPeriodResponse = {
  value: number;
  meter_date: string;
};

@Injectable()
export class FindByPeriodService {
  private dateUtils: DateUtils;

  constructor(
    @Inject(ENERGY_RECORDS_REPOSITORY)
    private readonly energyRecordsRepository: EnergyRecordsRepository,
  ) {
    this.dateUtils = new DateUtils();
  }

  getRangeDates(dto: FindByDateDto): RangeDates {
    const { date, period } = dto;
    const periodStrategy = {
      daily: {
        suffix: 'OfDay',
        operation: 'hour',
      },
      weekly: {
        suffix: 'OfWeek',
        operation: 'day',
      },
      monthly: {
        suffix: 'OfMonth',
        operation: 'day',
      },
    };
    const periodOperation = periodStrategy[period].operation;
    const periodSuffix = periodStrategy[period].suffix;
    const startMethodName = `start${periodSuffix}`;
    const endMethodName = `end${periodSuffix}`;
    const startDate = this.dateUtils[startMethodName](date);
    const endDate = this.dateUtils[endMethodName](date);

    return { startDate, endDate, periodOperation };
  }

  fillEmptyValues(
    startDate: Date,
    endDate: Date,
    period: string,
  ): FindByPeriodResponse[] {
    const rest = [];
    const functionName = {
      hour: 'differenceInHours',
      day: 'differenceInDays',
    };
    const difference = this.dateUtils[functionName[period]](endDate, startDate);

    for (let total = 1; total < difference; total++) {
      const meterDate = this.dateUtils.add(startDate, {
        [`${period}s`]: total,
      });
      rest.push({
        meter_date: this.formatMeterDate(meterDate),
        value: 0,
      });
    }
    return rest;
  }

  private getValue = (delta: number, maxValue: number): number => {
    return delta > 0 ? delta : maxValue;
  };

  private formatMeterDate(meterDate: Date) {
    return this.dateUtils.format(meterDate, 'yyyy-MM-dd HH:mm:ss');
  }

  fillEmptyDates(range: RangeDates, data: Measures[]): FindByPeriodResponse[] {
    const defaultEndMeterDate = {
      meter_date: this.dateUtils.add(range.endDate, {
        [`${range.periodOperation}s`]: 1,
      }),
      value: 0,
    };
    const result = this.fillEmptyValues(
      this.dateUtils.sub(range.startDate, {
        [`${range.periodOperation}s`]: 1,
      }),
      data[0]?.meter_date || defaultEndMeterDate.meter_date,
      range.periodOperation,
    );
    for (let i = 0; i < data.length; i++) {
      const current = data[i];
      const next = data[i + 1] || defaultEndMeterDate;
      const rest = this.fillEmptyValues(
        current.meter_date,
        next.meter_date,
        range.periodOperation,
      );
      const delta = new Decimal(current.max).minus(current.min).toNumber();
      result.push(
        {
          meter_date: this.formatMeterDate(current.meter_date),
          value: this.getValue(delta, new Decimal(current.max).toNumber()),
        },
        ...rest,
      );
    }

    return result;
  }

  async exec(dto: FindByDateDto) {
    const { startDate, endDate, periodOperation } = this.getRangeDates(dto);
    const data: Measures[] = await this.energyRecordsRepository.findByDateRange(
      startDate.toISOString(),
      endDate.toISOString(),
      periodOperation,
    );
    const result = this.fillEmptyDates(
      { startDate, endDate, periodOperation },
      data,
    );
    return result;
  }
}
