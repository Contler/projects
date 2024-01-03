export function millisecondsUntilEndOfDay(currentDate: Date) {
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
  return endDate.getTime() - currentDate.getTime();
}

export function millisecondsSinceStartOfDay(currentDate: Date) {
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
  return currentDate.getTime() - startDate.getTime();
}
