import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';



@Injectable()
export class RestaurantEffects {
  private actions$ = inject(Actions);

  // init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RestaurantActions.initRestaurant),
  //     switchMap(() => of(RestaurantActions.loadRestaurantSuccess({ restaurant: [] }))),
  //     catchError((error) => {
  //       console.error('Error', error);
  //       return of(RestaurantActions.loadRestaurantFailure({ error }));
  //     }),
  //   ),
  // );
}
