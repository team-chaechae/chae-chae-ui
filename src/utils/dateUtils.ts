export function formatYMDWithDots(date: string) {
  return new Date(date)
    .toLocaleString('ko', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.\s*$/, '');
}
