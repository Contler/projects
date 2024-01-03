import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';

import { CategoryService } from '../../services';

import * as CategoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  private actions$ = inject(Actions);

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      switchMap((data) => this.categoryService.getCategoriesByRestaurant(data.restaurantId)),
      map((categories) => CategoriesActions.loadCategoriesSuccess({ categories })),
      catchError((error) => {
        console.error('Error', error);
        return of(CategoriesActions.loadCategoriesFailure({ error }));
      }),
    ),
  );

  constructor(private readonly categoryService: CategoryService) {}
}
