import { inject, Injectable } from '@angular/core';
import { GuestService } from '@contler/core/guest';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import * as ConfigActions from './config.actions';

@Injectable()
export class ConfigEffects {
  private actions$ = inject(Actions);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.loadUser),
      switchMap((data) => this.guestService.getGuests(data.id)),
      map((data) => ConfigActions.serUser({ user: data })),
    ),
  );

  constructor(private guestService: GuestService) {}
}
