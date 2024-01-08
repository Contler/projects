import { FormModel } from '@contler/dynamic-form';

import { RestaurantDto } from '../dto';

import { ProductModel } from './product.model';

export interface CartModel {
  id: number;
  product: ProductModel;
  quantity: number;
  form?: FormModel;
  restaurant: RestaurantDto;
  comments?: string;
}
