import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnChanges, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { CapitalizePipe, ColorCheckboxDirective } from '@contler/ui';
import { Subscription } from 'rxjs';

import { InputField } from '../../../models';

@Component({
  selector: 'ctr-multi-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ColorCheckboxDirective,
    MatRippleModule,
    DynamicTranslatePipe,
    CapitalizePipe,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
    { provide: NG_VALIDATORS, useExisting: MultiSelectComponent, multi: true },
  ],
})
export class MultiSelectComponent implements ControlValueAccessor, OnChanges, OnDestroy {
  inputField: InputField | undefined;
  onChange?: (data: InputField) => void;
  onTouch?: () => void;
  group = new FormGroup({});
  private subscribe: Subscription;

  constructor() {
    this.subscribe = this.group.valueChanges.subscribe((values: { [key: string]: boolean }) => {
      if (this.inputField) {
        const tempo = {} as { [key: string]: boolean };
        Object.keys(values).forEach((key) => {
          if (values[key]) {
            tempo[key] = values[key];
          }
        });
        this.inputField.value = tempo;
        this.onChange?.({ ...this.inputField } as InputField);
      }
    });
  }

  validate(): ValidationErrors | null {
    if (this.inputField?.required) {
      return this.inputField?.value && Object.keys(this.inputField.value).length ? null : { required: true };
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  writeValue(obj: InputField): void {
    if (obj) {
      this.inputField = obj;
      this.inputField?.option?.forEach((option) => {
        this.group.addControl(option, new FormControl(false));
      });
    }
  }

  ngOnChanges(): void {
    this.inputField?.option?.forEach((option) => {
      this.group.addControl(option, new FormControl(false));
    });
  }

  selectValue(value: string): void {
    this.group.get(value)?.setValue(!this.group.get(value)?.value);
  }

  registerOnChange(fn: (data: InputField) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
