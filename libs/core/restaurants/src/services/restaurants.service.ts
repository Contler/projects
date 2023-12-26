import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@contler/configState';
import { AuthHttpService } from './auth-http.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private http: HttpClient;

  constructor(authHandle: AuthHttpService, @Inject(API_URL) private apiUrl: string) {
    this.http = new HttpClient(authHandle);
  }

  getRestaurantsByHotelId(hotelId: string) {
    const url = new URL(`hotel/${hotelId}/restaurant`, this.apiUrl);
    return this.http.get(url.toString());
  }
}
