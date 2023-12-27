import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { HotelService } from '../../services/hotel.service';

import * as HotelActions from './hotel.actions';

@Injectable()
export class HotelEffects {
  private actions$ = inject(Actions);

  loadHotel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HotelActions.loadHotel),
      switchMap((action) => this.hotelService.getHotelByUser(action.userUid)),
      map((hotel) => HotelActions.setHotel({ hotel })),
    ),
  );

  constructor(private hotelService: HotelService) {}
}
