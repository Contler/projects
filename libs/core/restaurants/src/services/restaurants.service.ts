import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL, AuthHttpHandleService } from '@contler/utils';
import { map } from 'rxjs';

import { RestaurantDto } from '../dto';
import { RestaurantModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private http: HttpClient;

  constructor(
    authHandle: AuthHttpHandleService,
    @Inject(API_URL) private apiUrl: string,
  ) {
    this.http = new HttpClient(authHandle);
  }

  getRestaurantsByHotelId(hotelId: string) {
    const url = new URL(`hotel/${hotelId}/restaurant`, this.apiUrl);
    return this.http
      .get<RestaurantDto[]>(url.toString())
      .pipe(map((restaurants) => restaurants.map((restaurant) => new RestaurantDto(restaurant))));
  }

  getRestaurantById(restaurantId: string) {
    const url = new URL(`restaurant/${restaurantId}`, this.apiUrl);
    return this.http.get<RestaurantModel>(url.toString());
  }
}
