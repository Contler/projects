import { InputType } from "./input-type";

export interface InputField {
  description: string;
  type: InputType;
  value?: string | string[];
  option?: string[];
  required?: boolean;
  optionQuantity?: number[];
}
