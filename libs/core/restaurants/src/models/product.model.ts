export interface ProductModel {
  id: number;
  name: string;
  value: string;
  state: boolean;
  description: string;
  category: string;
  image: string;
  formId: string;
  position: number | null;
}
