import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { InputField } from '../../../models/input-field';

@Component({
  selector: 'contler-multi-select-with-quantities',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './multi-select-with-quantities.component.html',
  styleUrl: './multi-select-with-quantities.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectWithQuantitiesComponent),
      multi: true,
    },
  ],
})
export class MultiSelectWithQuantitiesComponent implements ControlValueAccessor, OnChanges, OnInit {
  @Input() inputField?: InputField;

  optionsMap: { [key: string]: number } = {};

  onChange?: (data: { [key: string]: number }) => void;
  onTouch?: () => void;

  ngOnInit(): void {
    this.optionsMap = {};
    if (this.inputField?.option) {
      this.inputField.option.forEach((option) => {
        this.optionsMap[option] = 0;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.optionsMap = {};
      if (this.inputField?.option) {
        this.inputField?.option.forEach((option) => {
          this.optionsMap[option] = 0;
        });
      }
    }
  }

  public registerOnChange(fn: (data: { [key: string]: number }) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public writeValue(obj: { [key: string]: number }): void {
    if (obj) {
      this.optionsMap = obj;
    }
  }

  addQuantity(option: string, index: number): void {
    if (this.optionsMap[option] >= 99) {
      return;
    }

    if (
      this.inputField?.optionQuantity &&
      this.inputField?.optionQuantity[index] &&
      this.optionsMap[option] >= this.inputField.optionQuantity[index]
    ) {
      return;
    }
    this.optionsMap[option]++;
    if (this.onChange) {
      this.onChange!(this.optionsMap);
    }
  }

  removeQuantity(option: string): void {
    if (this.optionsMap[option] <= 0) {
      return;
    }
    this.optionsMap[option]--;
    if (this.onChange) {
      this.onChange!(this.optionsMap);
    }
  }
}
