import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CATEGORIES_FEATURE_KEY, CategoriesState, categoriesAdapter } from './categories.reducer';

// Lookup the 'Categories' feature state managed by NgRx
export const selectCategoriesState = createFeatureSelector<CategoriesState>(CATEGORIES_FEATURE_KEY);

const { selectAll, selectEntities } = categoriesAdapter.getSelectors();

export const selectCategoriesLoaded = createSelector(selectCategoriesState, (state: CategoriesState) => state.loaded);

export const selectCategoriesError = createSelector(selectCategoriesState, (state: CategoriesState) => state.error);

export const selectAllCategories = createSelector(selectCategoriesState, (state: CategoriesState) => selectAll(state));

export const selectOpenCategories = createSelector(selectAllCategories, (categories) =>
  categories.filter((cat) => cat.isActive()),
);

export const selectCategoriesEntities = createSelector(selectCategoriesState, (state: CategoriesState) =>
  selectEntities(state),
);

export const selectSelectedCategoryId = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.selectedId,
);

export const selectCategoryEntity = createSelector(
  selectCategoriesEntities,
  selectSelectedCategoryId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
