import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { CanActivateFn } from '@angular/router';
import { map, tap } from 'rxjs';

export const isLoginGuard: CanActivateFn = () => {
  const auth: Auth = inject(Auth);
  return user(auth).pipe(map((user) => !!user), tap((isLogin) => {
    if (!isLogin) {
      window.location.href = '/';
    }
  }));
};
