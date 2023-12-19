import { Route } from '@angular/router';

import { isLoginGuard } from './guards/is-login.guard';

export const appRoutes: Route[] = [
  {
    path: 'hola',
    loadComponent: () => import('./nx-welcome.component').then(m => m.NxWelcomeComponent),
    canActivate: [isLoginGuard],
  }
];
