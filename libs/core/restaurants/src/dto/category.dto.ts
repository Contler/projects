import { CategoryModel } from '../models';
import { millisecondsSinceStartOfDay, millisecondsUntilEndOfDay } from '../utils';
import { toDayString } from '../utils';

export class CategoryDto {
  restaurant: string;
  name: string;
  uid: string;
  status: boolean;
  startTime?: Date;
  endTime?: Date;
  days?: string[];

  constructor(data: CategoryModel) {
    this.restaurant = data.restaurant;
    this.name = data.name;
    this.uid = data.uid;
    this.status = data.status;
    this.days = data.days;
    this.startTime = data.startTime ? new Date(data.startTime) : undefined;
    const endTime = data.endTime ? new Date(data.endTime) : undefined;

    if (this.startTime && endTime && this.startTime > endTime) {
      const timeFinishDay = millisecondsUntilEndOfDay(this.startTime);
      const timeStartDay = millisecondsSinceStartOfDay(endTime);
      this.endTime = new Date(this.startTime.getTime() + timeFinishDay + timeStartDay);
    } else {
      this.endTime = endTime;
    }
  }

  isActive() {
    if (!this.days || this.days.length === 0 || !this.startTime || !this.endTime) {
      return true;
    }
    const today = new Date();
    const actualDayString = toDayString(today);
    if (this.days.includes(actualDayString)) {
      return this.startTime <= today && this.endTime >= today;
    }
    return false;
  }
}
