import { CdkScrollable } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import {
  CategoryDto,
  loadRestaurantById,
  RestaurantDto,
  selectCategory,
  selectEntity,
  selectOpenCategories,
  selectRestaurantLoaded,
  selectSelectedCategoryId,
} from '@contler/core/restaurants';
import {
  ButtonComponent,
  CapitalizePipe,
  ChipComponent,
  HeaderComponent,
  InfoCardComponent,
  ProductCardComponent,
  ProductCardSkeletonComponent,
  ScrollComponent,
  ScrollItemComponent,
} from '@contler/ui';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { filter, first, map, Observable } from 'rxjs';

import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsCategoryComponent } from './components/products-category/productsCategory.component';

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
    ProductCardSkeletonComponent,
    CategoriesComponent,
    HeaderComponent,
    DynamicTranslatePipe,
    CapitalizePipe,
    ProductsCategoryComponent,
    CdkScrollable,
    ScrollComponent,
    ScrollItemComponent,
    ButtonComponent,
    RouterModule,
  ],
  templateUrl: './restaurant-products-page.component.html',
  styleUrl: './restaurant-products-page.component.scss',
})
export class RestaurantProductsPageComponent implements AfterViewInit {
  @ViewChild('scrolled') scrollable: ScrollComponent | undefined;
  @ViewChild('parent') parent: ElementRef<HTMLElement> | undefined;
  restaurant$: Observable<RestaurantDto>;
  restaurantClosed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  categories$: Observable<CategoryDto[]>;
  contentHeight = 0;

  constructor(
    private route: ActivatedRoute,
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
      map((restaurant) => {
        return !restaurant?.isOpen();
      }),
    );
    this.categories$ = this.store.select(selectOpenCategories);
  }

  ngAfterViewInit(): void {
    if (this.parent?.nativeElement) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.contentHeight = entry.contentRect.height;
        }
      });
      resizeObserver.observe(this.parent.nativeElement);
    }
  }

  goBack() {
    window.location.href = '/home/delivery';
  }

  active(category: CategoryDto) {
    this.store
      .select(selectSelectedCategoryId)
      .pipe(first())
      .subscribe((id) => {
        if (id !== category.uid) {
          this.store.dispatch(selectCategory({ categoryId: category.uid }));
        }
      });
  }

  goToCategory(uid: string | number | undefined) {
    this.scrollable?.scrollElement(uid as string);
  }
}
