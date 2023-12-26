import { createFeatureSelector } from '@ngrx/store';

import { CONFIG_FEATURE_KEY, ConfigState } from './config.reducer';

// Lookup the 'Config' feature state managed by NgRx
export const selectConfigState = createFeatureSelector<ConfigState>(CONFIG_FEATURE_KEY);

