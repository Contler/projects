import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { CategoryDto, ProductModel } from '@contler/core/restaurants';
import { CapitalizePipe, ProductCardComponent } from '@contler/ui';

@Component({
  selector: 'contler-products-category',
  standalone: true,
  imports: [CommonModule, DynamicTranslatePipe, CapitalizePipe, ProductCardComponent],
  templateUrl: './productsCategory.component.html',
  styleUrl: './productsCategory.component.scss',
})
export class ProductsCategoryComponent implements OnChanges {
  @Input() category!: CategoryDto;
  @Input() products: ProductModel[] = [];
  productsCategories: ProductModel[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products.length) {
      const tempo = this.products
        .filter((product) => product.category === this.category.uid)
        .sort((a, b) => (a.position != null && b.position != null ? a.position - b.position : 0));
      this.productsCategories = [...tempo];
    }
  }
}
