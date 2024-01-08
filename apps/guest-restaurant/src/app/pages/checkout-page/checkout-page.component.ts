import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { RoomService, hotelFeature } from '@contler/core/hotel';
import {
  CartModel,
  RestaurantDto,
  TimeOfDelivery,
  selectAllCart,
  selectCartItemsByRestaurant,
  selectTotal,
} from '@contler/core/restaurants';
import { BoxFieldComponent, NavbarComponent } from '@contler/ui';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

import { TimeOfDeliveryComponent } from './components/time-of-delivery/time-of-delivery.component';
import { ZoneModalComponent } from './components/zone-modal/zone-modal.component';

@Component({
  selector: 'contler-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    BoxFieldComponent,
    NavbarComponent,
    DynamicTranslatePipe,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatBottomSheetModule,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent {
  cart: CartModel[] = [];
  total: number = 0;
  cartItemsByRestaurant: { restaurant: RestaurantDto; items: CartModel[] }[] = [];
  symbol: string | undefined;
  roomService: RoomService | undefined;
  expandedRestaurants: string[] = [];
  timeOfDelivery: TimeOfDelivery = {
    option: 0,
    time: new Date(),
  };

  constructor(
    private store: Store,
    private matBottomSheet: MatBottomSheet,
  ) {
    this.store.select(selectAllCart).subscribe((cart) => {
      this.cart = cart;
    });
    this.store.select(selectTotal).subscribe((total) => {
      this.total = total;
    });
    this.store.select(selectCartItemsByRestaurant).subscribe((cartItemsByRestaurant) => {
      this.cartItemsByRestaurant = cartItemsByRestaurant;
      console.log(cartItemsByRestaurant);
      
    });
    this.store
      .select(hotelFeature.selectHotelConfig)
      .pipe(
        filter((config) => !!config),
        first(),
      )
      .subscribe((config) => {
        this.symbol = config?.currency.symbol;
        this.roomService = config?.serviceCost.roomService;
      });
  }

  expandRestaurant(uid: string): void {
    if (this.expandedRestaurants.includes(uid)) {
      this.expandedRestaurants = this.expandedRestaurants.filter((id) => id !== uid);
    } else {
      this.expandedRestaurants.push(uid);
    }
  }

  isRestaurantExpanded(uid: string): boolean {
    return this.expandedRestaurants.includes(uid);
  }

  openZoneBottomSheet() {
    this.matBottomSheet.open(ZoneModalComponent, {
      data: {
        zones: [
          {
            name: 'Room',
            uid: 'room',
          },
        ],
        selectedZone: {
          name: 'Room',
          uid: 'room',
        },
      },
      panelClass: 'bottom-sheet-container',
    });
  }

  openTimeBottomSheet() {
    this.matBottomSheet.open(TimeOfDeliveryComponent, {
      data: this.timeOfDelivery,
      panelClass: 'bottom-sheet-container',
    });
  }
}
