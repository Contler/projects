import { Route } from '@angular/router';
import { CATEGORIES_FEATURE_KEY, categoriesReducer } from '@contler/core/restaurants';
import { provideState } from '@ngrx/store';

import { isLoginGuard } from './guards/is-login.guard';
import * as Pages from './pages';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Pages.RestaurantPageComponent,
    canActivate: [isLoginGuard],
  },
  {
    path: ':id/products',
    component: Pages.RestaurantProductsPageComponent,
    canActivate: [isLoginGuard],
    providers: [provideState({ name: CATEGORIES_FEATURE_KEY, reducer: categoriesReducer })],
  },
];
