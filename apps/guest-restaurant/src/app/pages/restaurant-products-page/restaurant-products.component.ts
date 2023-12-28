import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel, ProductModel, RestaurantModel, RestaurantsService } from '@contler/core/restaurants';
import { ChipComponent, InfoCardComponent, ItemCardComponent } from '@contler/ui';
import { TranslateModule } from '@ngx-translate/core';
import { map, switchMap } from 'rxjs';

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
    ItemCardComponent,
    InfoCardComponent,
  ],
  templateUrl: './restaurant-products.component.html',
  styleUrl: './restaurant-products.component.scss',
})
export class RestaurantProductsComponent implements OnInit {
  categories: CategoryModel[] = categoriesMocks;
  selectedCategory: CategoryModel = this.categories[0];
  products: ProductModel[] = productsMocks;
  restaurant: RestaurantModel | undefined;
  restaurantClosed: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
  ) {}

  ngOnInit(): void {
    this.loadRestaurant();
  }

  loadRestaurant() {
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.restaurantService.getRestaurantById(id)),
      )
      .subscribe((restaurant) => {
        this.restaurant = restaurant;
      });
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
