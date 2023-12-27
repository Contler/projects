import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CONFIG_FEATURE_KEY, ConfigEffects, reducer } from '@contler/configState';
import { HotelEffects, hotelFeature } from '@contler/core/hotel';
import { RESTAURANT_FEATURE_KEY, RestaurantEffects, restaurantReducer } from '@contler/core/restaurants';
import { SimpleLocalizeHttpLoaderService } from '@contler/translate';
import { API_URL } from '@contler/utils';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';

export function HttpLoaderFactory(http: HttpClient) {
  return new SimpleLocalizeHttpLoaderService(http, 'guest');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState({ name: RESTAURANT_FEATURE_KEY, reducer: restaurantReducer }),
    provideState({ name: CONFIG_FEATURE_KEY, reducer: reducer }),
    provideState({ name: hotelFeature.name, reducer: hotelFeature.reducer }),
    provideEffects([RestaurantEffects, ConfigEffects, HotelEffects]),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideAnimations(),
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
        defaultLanguage: 'en_US',
        useDefaultLang: true,
      }),
    ),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    { provide: APP_BASE_HREF, useValue: '/home/restaurant/' },
    { provide: API_URL, useValue: environment.apiUrl },
  ],
};
