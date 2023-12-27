import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL, AuthHttpHandleService } from '@contler/utils';

import { HotelModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private http: HttpClient;

  constructor(private authHandle: AuthHttpHandleService, @Inject(API_URL) private apiUrl: string) {
    this.http = new HttpClient(this.authHandle);
  }

  getHotelByUser(userUid: string) {
    const url = new URL(`/hotel/user/${userUid}`, this.apiUrl);
    return this.http.get<HotelModel>(url.toString());
  }
}
