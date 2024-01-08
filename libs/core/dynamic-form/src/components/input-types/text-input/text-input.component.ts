import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, forwardRef, Injector } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { CapitalizePipe } from '@contler/ui';

import { InputField } from '../../../models';

export class CustomErrorMatcher implements ErrorStateMatcher {
  constructor(private customControl: AbstractControl) {}
  isErrorState(): boolean {
    return this.customControl && this.customControl.touched && this.customControl.invalid;
  }
}

@Component({
  selector: 'ctr-text-input',
  standalone: true,
  imports: [CommonModule, DynamicTranslatePipe, CapitalizePipe, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: TextInputComponent, multi: true },
  ],
})
export class TextInputComponent implements ControlValueAccessor, AfterViewInit {
  inputField: InputField | undefined;
  isDisabled = false;
  errorMatcher!: CustomErrorMatcher;

  onChange?: (data: InputField) => void;
  onTouch?: () => void;

  constructor(public injector: Injector) {}

  ngAfterViewInit(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (ngControl) {
      this.errorMatcher = new CustomErrorMatcher(ngControl?.control as AbstractControl);
    }
  }

  validate(): ValidationErrors | null {
    if (this.inputField?.required) {
      return this.inputField?.value ? null : { required: true };
    }
    return null;
  }

  writeValue(obj: InputField): void {
    if (!obj) return;
    this.inputField = obj;
  }
  registerOnChange(fn: (data: InputField) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  updateValue() {
    this.onChange?.({ ...(this.inputField as InputField) });
  }
}
