import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { CategoryDto } from '../../dto';

import * as CategoriesActions from './categories.actions';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface CategoriesState extends EntityState<CategoryDto> {
  selectedId?: string | number; // which Categories record has been selected
  loaded: boolean; // has the Categories list been loaded
  error?: string | null; // last known error (if any)
}

export const categoriesAdapter: EntityAdapter<CategoryDto> = createEntityAdapter<CategoryDto>({
  selectId: (category) => category.uid,
});

export const initialCategoriesState: CategoriesState = categoriesAdapter.getInitialState({
  loaded: true,
});

const reducer = createReducer(
  initialCategoriesState,
  on(CategoriesActions.loadCategories, (state) => ({ ...state, loaded: true, error: null })),
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => {
    const activeCategories = categories.filter((cat) => cat.isActive());
    return categoriesAdapter.setAll(activeCategories, { ...state, loaded: false, selectedId: activeCategories[0].uid });
  }),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({ ...state, error })),
  on(CategoriesActions.selectCategory, (state, { categoryId }) => ({ ...state, selectedId: categoryId })),
);

export function categoriesReducer(state: CategoriesState | undefined, action: Action) {
  return reducer(state, action);
}
