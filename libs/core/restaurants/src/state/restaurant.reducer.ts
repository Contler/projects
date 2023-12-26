import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RestaurantActions from './restaurant.actions';
import { RestaurantEntity } from './restaurant.models';

export const RESTAURANT_FEATURE_KEY = 'restaurant';

export interface RestaurantState extends EntityState<RestaurantEntity> {
  selectedId?: string | number; // which Restaurant record has been selected
  loaded: boolean; // has the Restaurant list been loaded
  error?: string | null; // last known error (if any)
}

export interface RestaurantPartialState {
  readonly [RESTAURANT_FEATURE_KEY]: RestaurantState;
}

export const restaurantAdapter: EntityAdapter<RestaurantEntity> = createEntityAdapter<RestaurantEntity>();

export const initialRestaurantState: RestaurantState = restaurantAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialRestaurantState,
  on(RestaurantActions.initRestaurant, (state) => ({ ...state, loaded: false, error: null })),
  on(RestaurantActions.loadRestaurantSuccess, (state, { restaurant }) => restaurantAdapter.setAll(restaurant, { ...state, loaded: true })),
  on(RestaurantActions.loadRestaurantFailure, (state, { error }) => ({ ...state, error })),
);

export function restaurantReducer(state: RestaurantState | undefined, action: Action) {
  return reducer(state, action);
}
