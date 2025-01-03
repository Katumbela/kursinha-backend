 
import { format } from 'date-fns';

export function formatDate(date: Date | string, dateFormat: string = 'yyyy-MM-dd'): string {
  return format(new Date(date), dateFormat);
}
