import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { CapitalizePipe, RadioButtonDirective } from '@contler/ui';

import { InputField } from '../../../models';

@Component({
  selector: 'ctr-radio-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatRippleModule,
    RadioButtonDirective,
    DynamicTranslatePipe,
    CapitalizePipe,
    FormsModule,
  ],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: RadioInputComponent, multi: true },
  ],
})
export class RadioInputComponent implements ControlValueAccessor {
  inputField: InputField | undefined;

  onChange?: (data: InputField) => void;
  onTouch?: () => void;

  validate(): ValidationErrors | null {
    if (this.inputField?.required) {
      return this.inputField?.value ? null : { required: true };
    }
    return null;
  }

  public registerOnChange(fn: (data: InputField) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  writeValue(obj: InputField): void {
    if (obj) {
      this.inputField = obj;
    }
  }

  changeValue() {
    if (this.inputField) {
      this.onChange?.({ ...(this.inputField as InputField) });
    }
  }

  setValue(value: string) {
    if (this.inputField) {
      this.inputField.value = value;
      this.onChange?.({ ...(this.inputField as InputField) });
    }
  }
}
