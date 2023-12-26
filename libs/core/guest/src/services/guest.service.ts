import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@contler/configState';
import { AuthHttpHandleService } from '@contler/utils';

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
    return this.http.get(url.toString());
  }
}
