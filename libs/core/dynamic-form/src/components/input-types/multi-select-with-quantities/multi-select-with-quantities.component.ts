import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DynamicTranslatePipe } from '@contler/core/dynamicTranslate';
import { CapitalizePipe, HotelColorDirective } from '@contler/ui';

import { InputField } from '../../../models';

@Component({
  selector: 'ctr-multi-select-with-quantities',
  standalone: true,
  imports: [CommonModule, MatIconModule, DynamicTranslatePipe, CapitalizePipe, HotelColorDirective],
  templateUrl: './multi-select-with-quantities.component.html',
  styleUrl: './multi-select-with-quantities.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectWithQuantitiesComponent),
      multi: true,
    },
    { provide: NG_VALIDATORS, useExisting: MultiSelectWithQuantitiesComponent, multi: true },
  ],
})
export class MultiSelectWithQuantitiesComponent implements ControlValueAccessor {
  inputField: InputField | undefined;

  optionsMap: { [key: string]: number } = {};

  onChange?: (data: InputField) => void;
  onTouch?: () => void;

  validate(): ValidationErrors | null {
    if (this.inputField?.required) {
      return Object.values(this.optionsMap).find((val) => val !== 0) ? null : { required: true };
    }
    return null;
  }

  registerOnChange(fn: (data: InputField) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  writeValue(obj: InputField): void {
    if (obj) {
      this.inputField = obj;
      this.optionsMap =
        this.inputField?.option?.reduce(
          (pre, pos) => {
            pre[pos] = 0;
            return pre;
          },
          {} as { [key: string]: number },
        ) ?? {};
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
    this.changeModel();
  }

  removeQuantity(option: string): void {
    if (this.optionsMap[option] <= 0) {
      return;
    }
    this.optionsMap[option]--;
    this.changeModel();
  }

  private changeModel() {
    const tempoValue = {} as { [key: string]: number };
    Object.keys(this.optionsMap).forEach((key) => {
      if (this.optionsMap[key]) {
        tempoValue[key] = this.optionsMap[key];
      }
    });
    if (this.inputField) {
      this.inputField.value = tempoValue;
      this.onChange?.({ ...this.inputField } as InputField);
    }
  }
}
