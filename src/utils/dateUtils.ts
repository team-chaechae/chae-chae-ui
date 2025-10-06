import { format } from 'date-fns';

export function formatYMDWithDots(date: string) {
  return new Date(date)
    .toLocaleString('ko', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.\s*$/, '');
}
export function formatYMDWithDash(date: string) {
  return format(date, 'yyyy-MM-dd');
}
