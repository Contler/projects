import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import {
  CategoryDto,
  loadCategories,
  selectCategoriesLoaded,
  selectCategory,
  selectOpenCategories,
  selectSelectedCategoryId,
} from '@contler/core/restaurants';
import { ChipComponent } from '@contler/ui';
import { Store } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'contler-categories',
  standalone: true,
  imports: [CommonModule, ChipComponent, NgxSkeletonLoaderModule, DynamicTranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnChanges, OnDestroy, OnInit {
  @Input() restaurantId: string | undefined;
  @Output() selectCategory = new EventEmitter<string | number | undefined>();
  categories$: Observable<CategoryDto[]>;
  categorySelected: string | number | undefined;
  isLoaded$: Observable<boolean>;

  private unsubscribe: Subscription | undefined;

  constructor(
    private store: Store,
    private ctr: ChangeDetectorRef,
  ) {
    this.categories$ = this.store.select(selectOpenCategories);
    this.isLoaded$ = this.store.select(selectCategoriesLoaded);
  }

  ngOnInit(): void {
    this.unsubscribe = this.store.select(selectSelectedCategoryId).subscribe((id) => {
      this.categorySelected = id;
      this.ctr.detectChanges();
      document
        .getElementById(`chip-category-${id}`)
        ?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurantId'] && this.restaurantId) {
      this.store.dispatch(loadCategories({ restaurantId: this.restaurantId }));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe?.unsubscribe();
  }

  changeCategory(uid: string) {
    this.store.dispatch(selectCategory({ categoryId: uid }));
    this.selectCategory.emit(uid);
  }
}
