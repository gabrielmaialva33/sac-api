import { differenceInMinutes, format } from 'date-fns';
import { Between } from 'typeorm';

export function ISOToDBDate(isoDate: string | Date): string {
  return format(new Date(isoDate), 'yyyy-MM-dd kk:mm:ss.SSS');
}

export function DBDateToISO(db_date: Date) {
  return db_date.toISOString();
}

export const BetweenDates = (from: Date | string, to: Date | string) =>
  Between(
    format(
      typeof from === 'string' ? new Date(from) : from,
      'YYYY-MM-DD HH:MM:SS'
    ),
    format(typeof to === 'string' ? new Date(to) : to, 'YYYY-MM-DD HH:MM:SS')
  );

export const SetGranularity = (
  start_date: Date | number,
  end_date: Date | number
) => {
  const dif_minutes = differenceInMinutes(start_date, end_date);
  if (dif_minutes <= 180) {
    return 'minute';
  } else if (dif_minutes < 1440) {
    return 'hour';
  } else {
    return 'day';
  }
};
