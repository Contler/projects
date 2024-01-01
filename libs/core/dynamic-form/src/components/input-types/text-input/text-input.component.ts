import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { InputField } from '../../../models/input-field';

@Component({
  selector: 'contler-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextInputComponent), multi: true }],
})
export class TextInputComponent implements ControlValueAccessor, OnDestroy {
  @Input() inputField?: InputField;
  onChange?: (data: string) => void;
  onTouch?: () => void;
  control = new FormControl('');
  unsubscribe$ = new Subject<void>();

  constructor() {
    this.control.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.onChange) {
        this.onChange!(value as string);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public registerOnChange(fn: (data: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public writeValue(obj: string): void {
    if (obj && this.inputField) {
      this.inputField.value = obj;
    }
  }

  get typeValue(): string {
    return this.inputField?.value as string;
  }
}
