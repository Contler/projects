import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { InputField, InputType } from '../../models';
import { MultiSelectComponent } from '../input-types/multi-select/multi-select.component';
import { MultiSelectWithQuantitiesComponent } from '../input-types/multi-select-with-quantities/multi-select-with-quantities.component';
import { RadioInputComponent } from '../input-types/radio-input/radio-input.component';
import { TextInputComponent } from '../input-types/text-input/text-input.component';

@Component({
  selector: 'ctr-dynamic-form',
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
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DynamicFormComponent),
      multi: true,
    },
  ],
})
export class DynamicFormComponent implements ControlValueAccessor, Validator, AfterViewInit {
  @Input() inputFieldList: InputField[] = [];
  form: FormGroup = new FormGroup({ items: new FormArray([]) });
  inputType = InputType;
  onChange: (value: unknown) => void = () => {};
  onTouched: (value: unknown) => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.inputFieldList.forEach((inputField) => {
      this.itemForm.push(new FormControl(inputField));
    });
    this.cdr.detectChanges();
    this.onChange([]);
    this.itemForm.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  validate(): ValidationErrors | null {
    return this.form.invalid ? { invalid: true } : null;
  }

  writeValue(obj: unknown): void {
    if (obj) {
      this.form.setValue(obj);
    }
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: unknown) => void): void {
    this.onTouched = fn;
  }

  get itemForm(): FormArray {
    return this.form.get('items') as FormArray;
  }
}
