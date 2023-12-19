import { APP_BASE_HREF } from '@angular/common';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes),
    { provide: APP_BASE_HREF, useValue: '/home/restaurant/' },
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'contler-dev',
          appId: '1:424830318314:web:07bf71086a5b858347c993',
          databaseURL: 'https://contler-dev.firebaseio.com',
          storageBucket: 'contler-dev.appspot.com',
          apiKey: 'AIzaSyC7-kFPHWTHaKaP2WFjIXWoAaf9QfSyr8Q',
          authDomain: 'contler-dev.firebaseapp.com',
          messagingSenderId: '424830318314',
          measurementId: 'G-YLK13DG5VC',
        }),
      ),
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
  ],
};
