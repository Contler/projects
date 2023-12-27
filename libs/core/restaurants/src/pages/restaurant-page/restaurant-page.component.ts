import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { hotelFeature } from '@contler/core/hotel';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

import { RestaurantsService } from '../../services';

@Component({
  selector: 'ctr-restaurant-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './restaurant-page.component.html',
  styleUrl: './restaurant-page.component.scss',
})
export class RestaurantPageComponent {
  constructor(
    private store: Store,
    private restaurantService: RestaurantsService,
  ) {
    this.store
      .select(hotelFeature.selectHotel)
      .pipe(
        filter((hotel) => !!hotel),
        first(),
      )
      .subscribe((hotel) => {
        if (hotel) {
          this.restaurantService.getRestaurantsByHotelId(hotel.uid).subscribe();
        }
      });
  }

  goBack() {
    window.location.href = '/home/delivery';
  }
}
