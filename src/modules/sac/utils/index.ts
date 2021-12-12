import { format } from 'date-fns';

export function ISOToDBDate(iso_date: string | Date): string {
  return format(new Date(iso_date), 'yyyy-MM-dd kk:mm:ss.SSS');
}
