import { createAction, props } from '@ngrx/store';

import { RestaurantModel } from '../../models';

export const loadRestaurantsByHotel = createAction(
  '[Restaurant Page] Load Restaurant by Hotel',
  props<{ hotelId: string }>(),
);

export const loadRestaurantSuccess = createAction(
  '[Restaurant/API] Load Restaurant Success',
  props<{ restaurant: RestaurantModel[] }>(),
);

export const loadRestaurantFailure = createAction('[Restaurant/API] Load Restaurant Failure');
