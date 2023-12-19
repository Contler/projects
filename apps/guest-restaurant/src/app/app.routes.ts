import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'hola',
    loadComponent: () => import('./nx-welcome.component').then(m => m.NxWelcomeComponent)
  }
];
