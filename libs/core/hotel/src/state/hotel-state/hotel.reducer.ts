import { createFeature, createReducer, on } from '@ngrx/store';

import { HotelModel } from '../../models';

import * as HotelActions from './hotel.actions';

export const HOTEL_FEATURE_KEY = 'hotelState';

export interface HotelState {
  hotel: HotelModel | null;
}

export const initialHotelState: HotelState = {
  hotel: null,
};

const reducer = createReducer(
  initialHotelState,
  on(HotelActions.setHotel, (state, { hotel }) => ({ ...state, hotel })),
);

export const hotelFeature = createFeature({
  name: HOTEL_FEATURE_KEY,
  reducer: reducer,
});
