import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { RoomService, ZoneModel, hotelFeature } from '@contler/core/hotel';
import {
  CartModel,
  PaymentMethod,
  RestaurantDto,
  TimeOfDelivery,
  selectAllCart,
  selectCartItemsByRestaurant,
  selectTotal,
} from '@contler/core/restaurants';
import { BoxFieldComponent, NavbarComponent } from '@contler/ui';
import { IonDatetime } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { filter, first } from 'rxjs';

import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
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
    IonDatetime,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent {
  cart: CartModel[] = [];
  paymentMethod: PaymentMethod = PaymentMethod.chargeToTheRoom;
  total: number = 0;
  selectedZone: ZoneModel | undefined;
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
    private router: Router,
  ) {
    this.store.select(selectAllCart).subscribe((cart) => {
      this.cart = cart;
      if (cart.length === 0) {
        this.router.navigate(['/']);
      }
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
    this.matBottomSheet
      .open(ZoneModalComponent, {
        panelClass: 'bottom-sheet-container',
        data: {
          selectedZone: this.selectedZone,
        },
      })
      .afterDismissed()
      .subscribe((zone) => {
        if (zone) {
          this.selectedZone = zone;
        }
      });
  }

  openTimeBottomSheet() {
    this.matBottomSheet.open(TimeOfDeliveryComponent, {
      data: this.timeOfDelivery,
      panelClass: 'bottom-sheet-container',
    });
  }

  openPaymentBottomSheet() {
    this.matBottomSheet.open(PaymentMethodComponent, {
      panelClass: 'bottom-sheet-container',
    });
  }
}
