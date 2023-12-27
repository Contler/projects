import { Route } from '@angular/router';
import { RestaurantPageComponent } from '@contler/core/restaurants';

import { isLoginGuard } from './guards/is-login.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: RestaurantPageComponent,
    canActivate: [isLoginGuard],
  },
  {
    path: 'hola',
    loadComponent: () => import('./nx-welcome.component').then(m => m.NxWelcomeComponent),
    canActivate: [isLoginGuard],
  }
];
