import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColorCheckboxDirective } from '@contler/ui';
import { Subject, takeUntil } from 'rxjs';

import { InputField } from '../../../models/input-field';
@Component({
  selector: 'contler-multi-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ColorCheckboxDirective,
    MatRippleModule,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() inputField?: InputField;
  onChange?: (data: { [key: string]: boolean }) => void;
  onTouch?: () => void;
  group = new FormGroup({});
  unsubscribe$ = new Subject<void>();

  constructor() {}

  writeValue(obj: { [key: string]: boolean }): void {
    if (obj) {
      this.group.setValue(obj);
    }
  }

  ngOnChanges(): void {
    this.inputField?.option?.forEach((option) => {
      this.group.addControl(option, new FormControl(false));
    });

    this.group.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.onChange) {
        this.onChange!(value);
      }
    });
  }

  selectValue(value: string): void {
    this.group.get(value)?.setValue(!this.group.get(value)?.value);
  }

  registerOnChange(fn: (data: { [key: string]: boolean }) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
