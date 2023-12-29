import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { RestaurantDto } from '../../dto';

import * as RestaurantActions from './restaurant.actions';

export const RESTAURANT_FEATURE_KEY = 'restaurant';

export interface RestaurantState extends EntityState<RestaurantDto> {
  selectedId: string | null;
  loaded: boolean;
  hasError: boolean;
}

export interface RestaurantPartialState {
  readonly [RESTAURANT_FEATURE_KEY]: RestaurantState;
}

export const restaurantAdapter: EntityAdapter<RestaurantDto> = createEntityAdapter<RestaurantDto>({
  selectId: (restaurant) => restaurant.uid,
  sortComparer: (a, b) => {
    if (a.position != null && b.position != null) {
      return a.position - b.position;
    }
    return 0;
  },
});

export const initialRestaurantState: RestaurantState = restaurantAdapter.getInitialState({
  loaded: true,
  hasError: false,
  selectedId: null,
});

const reducer = createReducer(
  initialRestaurantState,
  on(RestaurantActions.loadRestaurantsByHotel, (state) => ({
    ...state,
    loaded: true,
    hasError: false,
    selectedId: null,
  })),
  on(RestaurantActions.loadRestaurantById, (state, { id }) => ({
    ...state,
    loaded: true,
    hasError: false,
    selectedId: id,
  })),
  on(RestaurantActions.loadRestaurantSuccess, (state, { restaurant }) =>
    restaurantAdapter.setAll(restaurant, { ...state, loaded: false }),
  ),
  on(RestaurantActions.loadRestaurantByIdSuccess, (state, { restaurant }) =>
    restaurant ? restaurantAdapter.upsertOne(restaurant, { ...state, loaded: false }) : { ...state, loaded: false },
  ),
  on(RestaurantActions.loadRestaurantFailure, (state) => ({ ...state, loaded: false, hasError: true })),
);

export function restaurantReducer(state: RestaurantState | undefined, action: Action) {
  return reducer(state, action);
}
