export function toDayString(date: Date): string {
  switch (date.getDay()) {
    case 1:
      return 'DAYS.monday';
    case 2:
      return 'DAYS.tuesday';
    case 3:
      return 'DAYS.wednesday';
    case 4:
      return 'DAYS.thursday';
    case 5:
      return 'DAYS.friday';
    case 6:
      return 'DAYS.saturday';
    case 0:
      return 'DAYS.sunday';
    default:
      return '';
  }
}
