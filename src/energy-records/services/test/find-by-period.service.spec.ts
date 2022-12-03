import { Test, TestingModule } from '@nestjs/testing';

import { IntervalTimeDto } from '../../dto/find-by-date.dto';
import { FindByPeriodService } from '../find-by-period.service';
import { ENERGY_RECORDS_REPOSITORY } from '../../repositories/energy-records.repository';

describe('FindByPeriodService', () => {
  let service: FindByPeriodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByPeriodService,
        {
          provide: ENERGY_RECORDS_REPOSITORY,
          useValue: () => ({}),
        },
      ],
    }).compile();

    service = module.get<FindByPeriodService>(FindByPeriodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get dates from period', () => {
    const dto = {
      date: new Date('2022-10-12'),
      period: IntervalTimeDto.DAILY,
    };

    const actual = service.getRangeDates(dto);

    const expected = {
      startDate: new Date('2022-10-12T00:00:00.000Z'),
      endDate: new Date('2022-10-12T23:59:59.999Z'),
      periodOperation: 'hour',
    };
    expect(actual).toStrictEqual(expected);
  });

  it('should fill empty records', () => {
    const range = {
      startDate: new Date('2022-10-12T00:00:00.000Z'),
      endDate: new Date('2022-10-12T23:59:59.999Z'),
      periodOperation: 'hour',
    };
    const db = [
      {
        max: '4',
        min: '3',
        meter_date: new Date('2022-10-12T00:00:00.000Z'),
      },
      {
        max: '9.5',
        min: '9.5',
        meter_date: new Date('2022-10-12T01:00:00.000Z'),
      },
      {
        max: '1.7',
        min: '0.1',
        meter_date: new Date('2022-10-12T05:00:00.000Z'),
      },
      {
        max: '1.00003',
        min: '0.1',
        meter_date: new Date('2022-10-12T06:00:00.000Z'),
      },
      {
        max: '11370.07715',
        min: '11349.58203',
        meter_date: new Date('2022-10-12T23:00:00.000Z'),
      },
    ];

    const actual = service.fillEmptyDates(range, db);

    const expected = [
      {
        meter_date: '2022-10-12 00:00:00',
        value: 1,
      },
      {
        meter_date: '2022-10-12 01:00:00',
        value: 9.5,
      },
      {
        meter_date: '2022-10-12 02:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 03:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 04:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 05:00:00',
        value: 1.6,
      },
      {
        meter_date: '2022-10-12 06:00:00',
        value: 0.90003,
      },
      {
        meter_date: '2022-10-12 07:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 08:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 09:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 10:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 11:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 12:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 13:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 14:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 15:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 16:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 17:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 18:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 19:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 20:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 21:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 22:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 23:00:00',
        value: 20.49512,
      },
    ];
    expect(actual).toStrictEqual(expected);
    expect(true).toBe(true);
  });

  it('should fill empty records at start', () => {
    const range = {
      startDate: new Date('2022-10-12T00:00:00.000Z'),
      endDate: new Date('2022-10-12T23:59:59.999Z'),
      periodOperation: 'hour',
    };
    const db = [
      {
        max: '1.7',
        min: '0.1',
        meter_date: new Date('2022-10-12T05:00:00.000Z'),
      },
      {
        max: '1.00003',
        min: '0.1',
        meter_date: new Date('2022-10-12T06:00:00.000Z'),
      },
    ];

    const actual = service.fillEmptyDates(range, db);

    const expected = [
      {
        meter_date: '2022-10-12 00:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 01:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 02:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 03:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 04:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 05:00:00',
        value: 1.6,
      },
      {
        meter_date: '2022-10-12 06:00:00',
        value: 0.90003,
      },
      {
        meter_date: '2022-10-12 07:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 08:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 09:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 10:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 11:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 12:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 13:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 14:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 15:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 16:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 17:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 18:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 19:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 20:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 21:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 22:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 23:00:00',
        value: 0,
      },
    ];
    expect(actual).toStrictEqual(expected);
  });

  it('should get dates from period by hour', () => {
    const startDate = new Date('2022-10-12T01:00:00.000Z');
    const endDate = new Date('2022-10-12T05:00:00.000Z');

    const actual = service.fillEmptyValues(startDate, endDate, 'hour');

    const expected = [
      {
        meter_date: '2022-10-12 02:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 03:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-12 04:00:00',
        value: 0,
      },
    ];
    expect(actual).toStrictEqual(expected);
  });

  it('should get dates from period by day', () => {
    const startDate = new Date('2022-10-12T01:00:00.000Z');
    const endDate = new Date('2022-10-15T05:00:00.000Z');

    const actual = service.fillEmptyValues(startDate, endDate, 'day');

    const expected = [
      {
        meter_date: '2022-10-13 01:00:00',
        value: 0,
      },
      {
        meter_date: '2022-10-14 01:00:00',
        value: 0,
      },
    ];

    expect(actual).toStrictEqual(expected);
  });
});
