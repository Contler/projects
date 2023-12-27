import { createAction, props } from '@ngrx/store';

import { HotelModel } from '../../models';

export const loadHotelByUser = createAction('[Hotel/API] Load Hotel by user', props<{ userUid: string }>());
export const loadHotel = createAction('[Hotel/API] Load Hotel', props<{ hotelUid: string }>());

export const setHotel = createAction('[Hotel/API] Set Hotel', props<{ hotel: HotelModel }>());
