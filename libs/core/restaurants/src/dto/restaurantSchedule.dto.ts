import { RestaurantSchedule } from '../models';

export class RestaurantScheduleDto implements RestaurantSchedule {
  id: number;
  days: string;
  startTime: Date;
  endTime: Date;

  constructor(restaurantSchedule: RestaurantSchedule) {
    this.id = restaurantSchedule.id;
    this.days = restaurantSchedule.days;
    this.startTime = this.getTime(restaurantSchedule.startTime as string);
    const tempEndDate = this.getTime(restaurantSchedule.endTime as string);
    if (this.startTime > tempEndDate) {
      const timeFinishDay = this.millisecondsUntilEndOfDay(this.startTime);
      const timeStartDay = this.millisecondsSinceStartOfDay(tempEndDate);
      this.endTime = new Date(this.startTime.getTime() + timeFinishDay + timeStartDay);
    } else {
      this.endTime = tempEndDate;
    }
  }

  private getTime(time: string): Date {
    const regex = /(\d{2}):(\d{2}):(\d{2})([+-]\d{2})/;
    if (!regex.test(time)) {
      throw new Error('Invalid time format, format expected: HH:mm:ss[+-]TZ');
    }
    const split = regex
      .exec(time)
      ?.filter(Boolean)
      .map(Number)
      .filter((value) => !Number.isNaN(value));
    if (split) {
      const localTime = new Date();
      localTime.setHours(split[0]);
      localTime.setMinutes(split[1]);
      localTime.setSeconds(split[2]);

      const offset = split[3] + localTime.getTimezoneOffset() / 60;
      return new Date(localTime.getTime() - offset * 3600 * 1000);
    }
    throw new Error('Invalid time format, format expected: HH:mm:ss[+-]TZ');
  }

  private millisecondsUntilEndOfDay(currentDate: Date) {
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
    return endDate.getTime() - currentDate.getTime();
  }

  private millisecondsSinceStartOfDay(currentDate: Date) {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
    return currentDate.getTime() - startDate.getTime();
  }

  toString(): string {
    return `${this.startTime} - ${this.endTime}`;
  }
}
