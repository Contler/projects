import { createFeature, createReducer, on } from '@ngrx/store';

import { HotelConfigModel, HotelModel } from '../../models';

import * as HotelActions from './hotel.actions';

export const HOTEL_FEATURE_KEY = 'hotelState';

export interface HotelState {
  hotel: HotelModel | null;
  hotelConfig: HotelConfigModel | null;
}

export const initialHotelState: HotelState = {
  hotel: null,
  hotelConfig: null,
};

const reducer = createReducer(
  initialHotelState,
  on(HotelActions.setHotel, (state, { hotel }) => ({ ...state, hotel })),
  on(HotelActions.setHotelConfig, (state, { hotelConfig }) => ({ ...state, hotelConfig })),
);

export const hotelFeature = createFeature({
  name: HOTEL_FEATURE_KEY,
  reducer: reducer,
});
