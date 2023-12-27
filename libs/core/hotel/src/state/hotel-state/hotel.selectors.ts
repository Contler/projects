import { createFeatureSelector } from '@ngrx/store';

import { HOTEL_FEATURE_KEY, HotelState } from './hotel.reducer';

export const selectHotelState = createFeatureSelector<HotelState>(HOTEL_FEATURE_KEY);


