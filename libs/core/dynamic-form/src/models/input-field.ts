import { InputType } from './input-type';

export interface InputField {
  description: string;
  type: InputType;
  value?: unknown;
  option?: string[];
  required?: boolean;
  optionQuantity?: number[];
}
