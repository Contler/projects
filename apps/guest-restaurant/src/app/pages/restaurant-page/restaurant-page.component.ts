import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { hotelFeature, HotelModel } from '@contler/core/hotel';
import {
  loadRestaurantsByHotel,
  RestaurantDto,
  selectRestaurantClose,
  selectRestaurantLoaded,
  selectRestaurantOpen,
} from '@contler/core/restaurants';
import { InfoCardComponent, OptionCardComponent } from '@contler/ui';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { filter, first, map, Observable } from 'rxjs';

@Component({
  selector: 'contler-restaurant-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    OptionCardComponent,
    InfoCardComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './restaurant-page.component.html',
  styleUrl: './restaurant-page.component.scss',
})
export class RestaurantPageComponent {
  restaurants: RestaurantDto[] = [];
  showClosedInfo = true;
  isLoading$: Observable<boolean>;
  restaurants$: Observable<RestaurantDto[]>;
  restaurantsClose$: Observable<RestaurantDto[]>;

  constructor(private store: Store) {
    this.store
      .select(hotelFeature.selectHotel)
      .pipe(
        filter((hotel) => !!hotel),
        map((hotel) => hotel as HotelModel),
        first(),
      )
      .subscribe((hotel) => {
        this.store.dispatch(loadRestaurantsByHotel({ hotelId: hotel.uid }));
      });

    this.restaurants$ = this.store.select(selectRestaurantOpen);
    this.restaurantsClose$ = this.store.select(selectRestaurantClose);

    this.isLoading$ = this.store.select(selectRestaurantLoaded);
  }

  goBack() {
    window.location.href = '/home/delivery';
  }
}
