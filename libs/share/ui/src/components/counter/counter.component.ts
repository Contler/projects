import { CommonModule } from '@angular/common';
import { Component, effect, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ctr-counter',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CounterComponent), multi: true }],
})
export class CounterComponent implements ControlValueAccessor {
  value = signal(0);
  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};
  isDisabled = false;

  constructor() {
    effect(() => {
      this.onChange(this.value());
    });
  }

  writeValue(obj: number): void {
    this.value.set(obj);
  }
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  reduce() {
    this.value.set(this.value() - 1);
  }

  increase() {
    this.value.set(this.value() + 1);
  }
}
