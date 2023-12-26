import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL, AuthHttpHandleService } from '@contler/utils';

import { GuestModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private http: HttpClient;

  constructor(authHandle: AuthHttpHandleService, @Inject(API_URL) private apiUrl: string) {
    this.http = new HttpClient(authHandle);
  }

  getGuests(guestId: string) {
    const url = new URL(`/guest/${guestId}`, this.apiUrl);
    return this.http.get<GuestModel>(url.toString());
  }
}
