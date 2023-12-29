import { HotelModel } from '@contler/core/hotel';

import { ProductModel, RestaurantModel } from '../models';
import { toDayString } from '../utils/getDayString';

import { RestaurantScheduleDto } from './restaurantSchedule.dto';

export class RestaurantDto implements RestaurantModel {
  uid: string;
  name: string;
  state: boolean;
  image: string;
  isTransactional: boolean;
  position: number;
  hotel: HotelModel;
  products: ProductModel[];
  restaurantSchedules: RestaurantScheduleDto[];

  constructor(restaurant: RestaurantModel) {
    this.uid = restaurant.uid;
    this.name = restaurant.name;
    this.state = restaurant.state;
    this.image = restaurant.image;
    this.isTransactional = restaurant.isTransactional;
    this.position = restaurant.position;
    this.hotel = restaurant.hotel;
    this.products = restaurant.products;
    this.restaurantSchedules = restaurant.restaurantSchedules?.map((data) => new RestaurantScheduleDto(data)) || [];
  }

  isOpen(): boolean {
    if (this.restaurantSchedules.length === 0) {
      return true;
    }
    const actualDate = new Date();
    const actualDayString = toDayString(actualDate);
    return this.restaurantSchedules.some((scheduled) => {
      if (scheduled.days != null && scheduled.days.split(',').includes(actualDayString)) {
        return scheduled.startTime <= actualDate && scheduled.endTime >= actualDate;
      }
      return false;
    });
  }
}
