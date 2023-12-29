import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import {
  CategoryModel,
  ProductModel,
  RestaurantDto,
  RestaurantsService,
  loadRestaurantById,
  selectEntity,
  selectRestaurantLoaded,
} from '@contler/core/restaurants';
import { ChipComponent, InfoCardComponent, ProductCardComponent } from '@contler/ui';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, filter, map } from 'rxjs';

import { productsMocks, categoriesMocks } from './mocks';

@Component({
  selector: 'contler-restaurant-products',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    ChipComponent,
    ProductCardComponent,
    InfoCardComponent,
  ],
  templateUrl: './restaurant-products-page.component.html',
  styleUrl: './restaurant-products-page.component.scss',
})
export class RestaurantProductsPageComponent {
  categories: CategoryModel[] = categoriesMocks;
  selectedCategory: CategoryModel = this.categories[0];
  products: ProductModel[] = productsMocks;
  restaurant$: Observable<RestaurantDto>;
  restaurantClosed$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private store: Store,
  ) {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.store.dispatch(loadRestaurantById({ id }));
    });
    this.isLoading$ = this.store.select(selectRestaurantLoaded);
    this.restaurant$ = this.store
      .select(selectEntity)
      .pipe(filter((restaurant) => !!restaurant)) as Observable<RestaurantDto>;

    this.restaurantClosed$ = this.restaurant$.pipe(
      filter((restaurant) => !!restaurant),
      map((restaurant) => !restaurant.isOpen()),
    );
  }

  goBack() {
    window.location.href = '/home/delivery';
  }

  selectCategory(category: CategoryModel) {
    this.selectedCategory = category;
  }

  getCategoryProducts() {
    return this.products.filter((product) => product.category === this.selectedCategory.uid);
  }
}
