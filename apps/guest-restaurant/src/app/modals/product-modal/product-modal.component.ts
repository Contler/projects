import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatInputModule } from '@angular/material/input';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { hotelFeature } from '@contler/core/hotel';
import { addItemToCart, CartModel, ProductModel, selectEntity } from '@contler/core/restaurants';
import {
  DynamicFormComponent,
  DynamicFormService,
  FormModel,
  MultiSelectComponent,
  MultiSelectWithQuantitiesComponent,
  RadioInputComponent,
  TextInputComponent,
} from '@contler/dynamic-form';
import { ButtonComponent, CounterComponent, HotelColorDirective, ModalContainerComponent } from '@contler/ui';
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
    ReactiveFormsModule,
    MatInputModule,
    TextInputComponent,
    RadioInputComponent,
    MultiSelectWithQuantitiesComponent,
    MultiSelectComponent,
    DynamicFormComponent,
    CounterComponent,
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductModalComponent implements OnInit {
  currency: string | undefined;
  form: FormModel | undefined;
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ProductModel,
    private _bottomSheetRef: MatBottomSheetRef<ProductModalComponent>,
    private store: Store,
    private dynamicFormService: DynamicFormService,
    formBuild: FormBuilder,
  ) {
    this.formGroup = formBuild.group({
      comments: [''],
      dynamicForm: [],
      quantity: [1, Validators.min(1)],
    });

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

  ngOnInit(): void {
    if (this.data.formId) {
      this.dynamicFormService.getForm(this.data.formId).then((form) => {
        this.form = form;
      });
    }
  }

  close() {
    this._bottomSheetRef.dismiss();
  }

  addProduct() {
    this.store
      .select(selectEntity)
      .pipe(first())
      .subscribe((restaurant) => {
        if (restaurant) {
          const { comments, dynamicForm, quantity } = this.formGroup.value;
          const cartItem: CartModel = {
            id: Date.now(),
            restaurant: restaurant,
            product: this.data,
            form: this.form ? ({ ...this.form, form: dynamicForm } as FormModel) : undefined,
            comments,
            quantity,
          };
          this.store.dispatch(addItemToCart({ item: cartItem }));
          this._bottomSheetRef.dismiss();
        }
      });
  }
}
