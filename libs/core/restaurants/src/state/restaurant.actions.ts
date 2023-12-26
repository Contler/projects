import { createAction, props } from '@ngrx/store';

import { RestaurantEntity } from './restaurant.models';

export const initRestaurant = createAction('[Restaurant Page] Init');

export const loadRestaurantSuccess = createAction('[Restaurant/API] Load Restaurant Success', props<{ restaurant: RestaurantEntity[] }>());
