import { ProductModel } from './product.model';

export interface ProductOrderModel {
  product: ProductModel;
  quantity: number;
  comment: string;
  id: string;
  promotion?: string;
  coupon?: string;
  discount?: number;
}
