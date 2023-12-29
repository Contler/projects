import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { RestaurantsService } from '../../services';

import * as RestaurantActions from './restaurant.actions';

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

  constructor(private readonly restaurantService: RestaurantsService) {}
}
