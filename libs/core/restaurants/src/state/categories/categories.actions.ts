import { createAction, props } from '@ngrx/store';

import { CategoryDto } from '../../dto';

export const loadCategories = createAction('[Categories Page] load categories', props<{ restaurantId: string }>());

export const loadCategoriesSuccess = createAction(
  '[Categories/API] Load Categories Success',
  props<{ categories: CategoryDto[] }>(),
);

export const loadCategoriesFailure = createAction(
  '[Categories/API] Load Categories Failure',
  props<{ error: string | null }>(),
);

export const selectCategory = createAction('[Categories Page] select category', props<{ categoryId: string }>());
