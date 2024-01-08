import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatInputModule } from '@angular/material/input';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { hotelFeature } from '@contler/core/hotel';
import { ProductModel } from '@contler/core/restaurants';
import {
  DynamicFormComponent,
  DynamicFormService,
  FormModel,
  MultiSelectComponent,
  MultiSelectWithQuantitiesComponent,
  RadioInputComponent,
  TextInputComponent,
} from '@contler/dynamic-form';
import { ButtonComponent, HotelColorDirective, ModalContainerComponent } from '@contler/ui';
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
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
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
    console.log(this.formGroup.value);
  }
}
