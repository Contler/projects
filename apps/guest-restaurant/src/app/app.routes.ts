import { Route } from '@angular/router';
import { CATEGORIES_FEATURE_KEY, categoriesReducer } from '@contler/core/restaurants';
import { provideState } from '@ngrx/store';

import { isLoginGuard } from './guards/is-login.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/restaurant-page/restaurant-page.component').then((m) => m.RestaurantPageComponent),
    canActivate: [isLoginGuard],
  },
  {
    path: ':id/products',
    loadComponent: () =>
      import('./pages/restaurant-products-page/restaurant-products-page.component').then(
        (m) => m.RestaurantProductsPageComponent,
      ),
    canActivate: [isLoginGuard],
    providers: [provideState({ name: CATEGORIES_FEATURE_KEY, reducer: categoriesReducer })],
  },
];
