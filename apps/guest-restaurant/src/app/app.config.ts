import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ConfigEffects, reducer, CONFIG_FEATURE_KEY } from '@contler/configState';
import { RESTAURANT_FEATURE_KEY, RestaurantEffects, restaurantReducer } from '@contler/core/restaurants';
import { API_URL } from '@contler/utils';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState({ name: RESTAURANT_FEATURE_KEY, reducer: restaurantReducer }),
    provideState({ name: CONFIG_FEATURE_KEY, reducer: reducer }),
    provideEffects([RestaurantEffects, ConfigEffects]),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideAnimations(),
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    { provide: APP_BASE_HREF, useValue: '/home/restaurant/' },
    { provide: API_URL, useValue: environment.apiUrl },
  ],
};
