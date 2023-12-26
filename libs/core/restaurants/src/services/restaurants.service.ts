import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL, AuthHttpHandleService } from '@contler/utils';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private http: HttpClient;

  constructor(authHandle: AuthHttpHandleService, @Inject(API_URL) private apiUrl: string) {
    this.http = new HttpClient(authHandle);
  }

  getRestaurantsByHotelId(hotelId: string) {
    const url = new URL(`hotel/${hotelId}/restaurant`, this.apiUrl);
    return this.http.get(url.toString());
  }
}
