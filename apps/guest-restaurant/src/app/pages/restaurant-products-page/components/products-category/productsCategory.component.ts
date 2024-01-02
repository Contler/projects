import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { hotelFeature } from '@contler/core/hotel';
import { CategoryDto, ProductModel } from '@contler/core/restaurants';
import { CapitalizePipe, ProductCardComponent } from '@contler/ui';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';

import { ProductModalComponent } from '../../../../modals/product-modal/product-modal.component';

@Component({
  selector: 'contler-products-category',
  standalone: true,
  imports: [CommonModule, DynamicTranslatePipe, CapitalizePipe, ProductCardComponent, MatBottomSheetModule],
  templateUrl: './productsCategory.component.html',
  styleUrl: './productsCategory.component.scss',
})
export class ProductsCategoryComponent implements OnChanges {
  @Input() category!: CategoryDto;
  @Input() products: ProductModel[] = [];
  productsCategories: ProductModel[] = [];
  symbol: string | undefined;

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
  ) {
    this.store
      .select(hotelFeature.selectHotelConfig)
      .pipe(
        filter((config) => !!config),
        first(),
      )
      .subscribe((config) => {
        this.symbol = config?.currency.symbol;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products.length) {
      const tempo = this.products
        .filter((product) => product.category === this.category.uid)
        .sort((a, b) => (a.position != null && b.position != null ? a.position - b.position : 0));
      this.productsCategories = [...tempo];
    }
  }

  openProduct(product: ProductModel) {
    this.bottomSheet.open(ProductModalComponent, { data: product, panelClass: 'bottom-sheet-container' });
  }
}
