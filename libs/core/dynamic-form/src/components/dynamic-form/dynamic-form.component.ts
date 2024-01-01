import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { InputField } from '../../models/input-field';
import { InputType } from '../../models/input-type';
import { MultiSelectComponent } from '../input-types/multi-select/multi-select.component';
import { MultiSelectWithQuantitiesComponent } from '../input-types/multi-select-with-quantities/multi-select-with-quantities.component';
import { RadioInputComponent } from '../input-types/radio-input/radio-input.component';
import { TextInputComponent } from '../input-types/text-input/text-input.component';

@Component({
  selector: 'contler-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    MultiSelectWithQuantitiesComponent,
    MultiSelectComponent,
    RadioInputComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFormComponent),
      multi: true,
    },
  ],
})
export class DynamicFormComponent implements OnChanges, ControlValueAccessor {
  @Input() inputFieldList: InputField[] = [];
  form: FormGroup = new FormGroup({});
  inputType = InputType;
  onChange: (value: unknown) => void = () => {};
  onTouched: (value: unknown) => void = () => {};

  ngOnChanges(): void {
    this.inputFieldList.forEach((inputField, index) => {
      const key = `inp-field-${index}`;
      this.form.addControl(key, new FormControl(inputField.value));
    });
    this.form.valueChanges.subscribe((value) => {
      const values = this.inputFieldList.map((inputField, index) => {
        return {
          ...inputField,
          value: value[`inp-field-${index}`],
        };
      });
      this.onChange(values);
    });
  }

  writeValue(obj: unknown): void {
    if (obj) {
      this.form.setValue(obj);
    }
  }

  getControlName(index: number): string {
    return `inp-field-${index}`;
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: unknown) => void): void {
    this.onTouched = fn;
  }
}
