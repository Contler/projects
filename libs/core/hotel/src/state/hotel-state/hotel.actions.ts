import { createAction, props } from '@ngrx/store';

import { HotelConfigModel, HotelModel } from '../../models';

export const loadHotelByUser = createAction('[Hotel/API] Load Hotel by user', props<{ userUid: string }>());
export const loadHotel = createAction('[Hotel/API] Load Hotel', props<{ hotelUid: string }>());

export const setHotel = createAction('[Hotel/API] Set Hotel', props<{ hotel: HotelModel }>());

export const loadHotelConfig = createAction('[Hotel/API] Load Hotel Config', props<{ hotelUid: string }>());

export const setHotelConfig = createAction('[Hotel/API] Set Hotel Config', props<{ hotelConfig: HotelConfigModel }>());
