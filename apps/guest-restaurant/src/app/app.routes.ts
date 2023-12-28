import { Route } from '@angular/router';

import { isLoginGuard } from './guards/is-login.guard';
import { RestaurantPageComponent } from './pages';
import { RestaurantProductsComponent } from './pages/restaurant-products-page/restaurant-products.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: RestaurantPageComponent,
    canActivate: [isLoginGuard],
  },
  {
    path: ':id/products',
    component: RestaurantProductsComponent,
    canActivate: [isLoginGuard],
  },
  {
    path: 'hola',
    loadComponent: () => import('./nx-welcome.component').then((m) => m.NxWelcomeComponent),
    canActivate: [isLoginGuard],
  },
];
