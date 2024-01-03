import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { hotelFeature } from '@contler/core/hotel';
import { ProductModel } from '@contler/core/restaurants';
import { ButtonComponent, ModalContainerComponent } from '@contler/ui';
import { HotelColorDirective } from '@contler/ui';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { filter, first } from 'rxjs';

@Component({
  selector: 'contler-product-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalContainerComponent,
    DynamicTranslatePipe,
    ButtonComponent,
    TranslateModule,
    HotelColorDirective,
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent {
  currency: string | undefined;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ProductModel,
    private _bottomSheetRef: MatBottomSheetRef<ProductModalComponent>,
    private store: Store,
  ) {
    this.store
      .select(hotelFeature.selectHotelConfig)
      .pipe(
        filter((data) => !!data),
        first(),
      )
      .subscribe((config) => {
        this.currency = config?.currency.symbol;
      });
  }

  close() {
    this._bottomSheetRef.dismiss();
  }
}
