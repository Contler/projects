import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { hotelFeature } from '@contler/core/hotel';
import { RestaurantsService, RestaurantModel } from '@contler/core/restaurants';
import { InfoCardComponent, OptionCardComponent } from '@contler/ui';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { filter, first } from 'rxjs';

@Component({
  selector: 'contler-restaurant-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslateModule, OptionCardComponent, InfoCardComponent],
  templateUrl: './restaurant-page.component.html',
  styleUrl: './restaurant-page.component.scss',
})
export class RestaurantPageComponent {
  restaurants: RestaurantModel[] = [];
  showClosedInfo = true;
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
        console.log(hotel);

        if (hotel) {
          this.restaurantService.getRestaurantsByHotelId(hotel.uid).subscribe((restaurants) => {
            this.restaurants = restaurants;
            console.log(this.restaurants);
          });
        }
      });
  }

  goBack() {
    window.location.href = '/home/delivery';
  }
}
