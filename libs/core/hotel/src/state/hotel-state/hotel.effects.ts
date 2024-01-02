import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { HotelService } from '../../services';

import * as HotelActions from './hotel.actions';

@Injectable()
export class HotelEffects {
  private actions$ = inject(Actions);

  loadHotelByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HotelActions.loadHotelByUser),
      switchMap((action) => this.hotelService.getHotelByUser(action.userUid)),
      map((hotel) => HotelActions.setHotel({ hotel })),
    ),
  );

  loadHotel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HotelActions.loadHotel),
      switchMap((action) => this.hotelService.getHotel(action.hotelUid)),
      map((hotel) => HotelActions.setHotel({ hotel })),
    ),
  );

  loadHotelConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HotelActions.setHotel),
      switchMap((action) => this.hotelService.getConfigHotel(action.hotel.uid)),
      map((hotelConfig) => HotelActions.setHotelConfig({ hotelConfig })),
    ),
  );

  constructor(private hotelService: HotelService) {}
}
