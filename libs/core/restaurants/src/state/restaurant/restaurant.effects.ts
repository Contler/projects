import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { RestaurantsService } from '../../services';

import * as RestaurantActions from './restaurant.actions';
import { selectRestaurantEntities } from './restaurant.selectors';

@Injectable()
export class RestaurantEffects {
  private actions$ = inject(Actions);

  loadRestaurant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.loadRestaurantsByHotel),
      switchMap(({ hotelId }) => this.restaurantService.getRestaurantsByHotelId(hotelId)),
      map((restaurant) => RestaurantActions.loadRestaurantSuccess({ restaurant })),
      catchError(() => of(RestaurantActions.loadRestaurantFailure())),
    ),
  );

  loadRestaurantById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.loadRestaurantById),
      withLatestFrom(this.store.select(selectRestaurantEntities)),
      switchMap(([action, entities]) => {
        const restaurant = entities[action.id];
        if (restaurant) {
          return of(RestaurantActions.loadRestaurantByIdSuccess({}));
        } else {
          return this.restaurantService.getRestaurantById(action.id).pipe(
            map((restaurant) => {
              return RestaurantActions.loadRestaurantByIdSuccess({ restaurant: restaurant });
            }),
          );
        }
      }),
    ),
  );

  constructor(
    private readonly restaurantService: RestaurantsService,
    private store: Store,
  ) {}
}
