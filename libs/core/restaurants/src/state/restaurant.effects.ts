import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as RestaurantActions from './restaurant.actions';
import * as RestaurantFeature from './restaurant.reducer';

@Injectable()
export class RestaurantEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.initRestaurant),
      switchMap(() => of(RestaurantActions.loadRestaurantSuccess({ restaurant: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(RestaurantActions.loadRestaurantFailure({ error }));
      }),
    ),
  );
}
