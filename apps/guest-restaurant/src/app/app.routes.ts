import { Route } from '@angular/router';

import { isLoginGuard } from './guards/is-login.guard';
import { RestaurantPageComponent } from './pages';

export const appRoutes: Route[] = [
  {
    path: '',
    component: RestaurantPageComponent,
    canActivate: [isLoginGuard],
  },
  {
    path: 'hola',
    loadComponent: () => import('./nx-welcome.component').then((m) => m.NxWelcomeComponent),
    canActivate: [isLoginGuard],
  },
];
