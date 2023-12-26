import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService extends HttpHandler {
  constructor(private readonly next: HttpHandler) {
    super();
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const auth: Auth = inject(Auth);
    return user(auth).pipe(
      switchMap((userData) => {
        if (userData) {
          return from(userData.getIdToken());
        } else {
          return of(null);
        }
      }),
      switchMap((token) => {
        if (token) {
          const clone = req.clone({
            setHeaders: { 'Authorization': `Bearer ${token}`}
          });
          return this.next.handle(clone);
        } else {
          return this.next.handle(req);
        }
      }),
    );
  }
}
