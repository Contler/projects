import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { RadioButtonDirective } from '@contler/ui';
import { Subject, takeUntil } from 'rxjs';

import { InputField } from '../../../models/input-field';

@Component({
  selector: 'contler-radio-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatRippleModule,
    RadioButtonDirective,
  ],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioInputComponent), multi: true }],
})
export class RadioInputComponent implements ControlValueAccessor, OnDestroy {
  @Input() inputField?: InputField;
  control = new FormControl();
  unsubscribe$ = new Subject<void>();

  onChange?: (data: string) => void;
  onTouch?: () => void;

  constructor() {
    this.control.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectValue(value: string): void {
    this.control.setValue(value);
  }

  public registerOnChange(fn: (data: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  writeValue(obj: string): void {
    if (obj && this.inputField) {
      this.inputField.value = obj;
      this.control.setValue(obj);
    }
  }
}
