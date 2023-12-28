import { HotelModel } from '@contler/core/hotel';

import { ProductModel } from './product.model';

export interface RestaurantModel {
  uid: string;
  name: string;
  state: boolean;
  image: string;
  isTransactional: boolean;
  position: number;
  hotel: HotelModel;
  products: ProductModel[];
  restaurantSchedules: RestaurantSchedule[];
}

export interface RestaurantSchedule {
  id: number;
  days: string;
  startTime: string;
  endTime: string;
}
