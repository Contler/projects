import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RESTAURANT_FEATURE_KEY, RestaurantState, restaurantAdapter } from './restaurant.reducer';

// Lookup the 'Restaurant' feature state managed by NgRx
export const selectRestaurantState = createFeatureSelector<RestaurantState>(RESTAURANT_FEATURE_KEY);

const { selectAll, selectEntities } = restaurantAdapter.getSelectors();

export const selectRestaurantLoaded = createSelector(selectRestaurantState, (state: RestaurantState) => state.loaded);

export const selectAllRestaurant = createSelector(selectRestaurantState, (state: RestaurantState) => selectAll(state));

export const selectRestaurantEntities = createSelector(selectRestaurantState, (state: RestaurantState) =>
  selectEntities(state),
);

export const selectSelectedId = createSelector(selectRestaurantState, (state: RestaurantState) => state.selectedId);

export const selectEntity = createSelector(selectRestaurantEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined,
);

export const selectRestaurantOpen = createSelector(selectAllRestaurant, (restaurants) =>
  restaurants.filter((restaurant) => restaurant.isOpen()),
);

export const selectRestaurantClose = createSelector(selectAllRestaurant, (restaurants) =>
  restaurants.filter((restaurant) => !restaurant.isOpen()),
);
