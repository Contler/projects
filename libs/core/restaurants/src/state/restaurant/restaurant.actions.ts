import { createAction, props } from '@ngrx/store';

import { RestaurantDto } from '../../dto';

export const loadRestaurantsByHotel = createAction(
  '[Restaurant Page] Load Restaurant by Hotel',
  props<{ hotelId: string }>(),
);

export const loadRestaurantSuccess = createAction(
  '[Restaurant/API] Load Restaurant Success',
  props<{ restaurant: RestaurantDto[] }>(),
);

export const loadRestaurantFailure = createAction('[Restaurant/API] Load Restaurant Failure');
