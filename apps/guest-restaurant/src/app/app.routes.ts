import { Route } from '@angular/router';

import { isLoginGuard } from './guards/is-login.guard';
import { RestaurantPageComponent } from './pages';
import { RestaurantProductsPageComponent } from './pages/restaurant-products-page/restaurant-products-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: RestaurantPageComponent,
    canActivate: [isLoginGuard],
  },
  {
    path: ':id/products',
    component: RestaurantProductsPageComponent,
    canActivate: [isLoginGuard],
  },
  {
    path: 'hola',
    loadComponent: () => import('./nx-welcome.component').then((m) => m.NxWelcomeComponent),
    canActivate: [isLoginGuard],
  },
];
