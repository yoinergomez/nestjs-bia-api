import {
  add,
  addMilliseconds,
  differenceInDays,
  differenceInHours,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  sub,
} from 'date-fns';

export class DateUtils {
  startOfDay(date: Date): Date {
    return startOfDay(date);
  }

  endOfDay(date: Date): Date {
    return endOfDay(date);
  }

  startOfWeek(date: Date): Date {
    return startOfWeek(date, { weekStartsOn: 1 });
  }

  endOfWeek(date: Date): Date {
    return endOfWeek(date, { weekStartsOn: 1 });
  }

  startOfMonth(date: Date): Date {
    return startOfMonth(date);
  }

  endOfMonth(date: Date): Date {
    return endOfMonth(date);
  }

  add(date: Date, duration: object): Date {
    return add(date, duration);
  }

  addMilliseconds(date: Date, amount: number): Date {
    return addMilliseconds(date, amount);
  }

  sub(date: Date, duration: object): Date {
    return sub(date, duration);
  }

  differenceInHours(dateLeft: Date, dateRight: Date): number {
    return differenceInHours(dateLeft, dateRight);
  }

  differenceInDays(dateLeft: Date, dateRight: Date): number {
    return differenceInDays(dateLeft, dateRight);
  }

  format(date: Date, formatStr: string): string {
    return format(date, formatStr);
  }
}
