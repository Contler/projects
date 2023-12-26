import { GuestModel } from '@contler/core/guest';
import { createReducer, on, createFeature } from '@ngrx/store';

import * as ConfigActions from './config.actions';

export const CONFIG_FEATURE_KEY = 'config';

export interface ConfigState {
  guest: GuestModel | null;
}

export const initialConfigState: ConfigState = {
  guest: null,
};

const configFeature = createFeature({
  name: CONFIG_FEATURE_KEY,
  reducer: createReducer(
    initialConfigState,
    on(ConfigActions.serUser, (state, { user }) => ({ ...state, guest: user })),
  ),
});

export const { reducer, selectGuest } = configFeature;
