import { DateUtils } from '../date.utils';

describe('DateUtils', () => {
  let util: DateUtils;
  const date = new Date('2022-07-02T16:35:49.016Z');

  beforeEach(() => {
    util = new DateUtils();
    Date.prototype.getTimezoneOffset = jest.fn(() => 0);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get first moment of day - #util.startOfDay', () => {
    const actual = util.startOfDay(date);

    const expected = '2022-07-02T00:00:00.000Z';
    expect(actual.toISOString()).toBe(expected);
  });

  it('should get last moment of day - #util.endOfDay', () => {
    const actual = util.endOfDay(date);

    const expected = '2022-07-02T23:59:59.999Z';
    expect(actual.toISOString()).toBe(expected);
  });

  it('should get first date of month - #util.startOfMonth', () => {
    const actual = util.startOfMonth(date);

    const expected = '2022-07-01T00:00:00.000Z';
    expect(actual.toISOString()).toBe(expected);
  });

  it('should get last date of month - #util.endOfMonth', () => {
    const actual = util.endOfMonth(date);

    const expected = '2022-07-31T23:59:59.999Z';
    expect(actual.toISOString()).toBe(expected);
  });

  it('should get first day of week - #util.startOfWeek', () => {
    const actual = util.startOfWeek(date);

    const expected = '2022-06-27T00:00:00.000Z';
    expect(actual.toISOString()).toBe(expected);
  });

  it('should get last day of week - #util.endOfWeek', () => {
    const actual = util.endOfWeek(date);

    const expected = '2022-07-03T23:59:59.999Z';
    expect(actual.toISOString()).toBe(expected);
  });

  it('should add days to date - #util.add', () => {
    const actual = util.add(date, { days: 1 });

    const expected = '2022-07-03T16:35:49.016Z';
    expect(actual.toISOString()).toBe(expected);
  });

  it('should add milliseconds - #util.addMilliseconds', () => {
    const date = new Date('2022-10-12T23:59:59.999Z');

    const actual = util.addMilliseconds(date, 1);

    const expected = '2022-10-13T00:00:00.000Z';
    expect(actual.toISOString()).toBe(expected);
  });

  it('should sub hours to date - #util.sub', () => {
    const actual = util.sub(date, { hours: 1 });

    const expected = '2022-07-02T15:35:49.016Z';
    expect(actual.toISOString()).toBe(expected);
  });

  it('should return the difference of hours - #util.differenceInHours', () => {
    const actual = util.differenceInHours(
      date,
      new Date('2022-07-02T10:36:49.016Z'),
    );

    const expected = 5;
    expect(actual).toBe(expected);
  });
});
