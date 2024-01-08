import { RestaurantModel } from './restaurant.model';

export interface ProductModel {
  id: number;
  name: string;
  value: number;
  state: boolean;
  description: string;
  category: string;
  image?: string;
  formId: string;
  position: number | null;
  restaurant?: Pick<RestaurantModel, 'name' | 'image' | 'uid'>;
}
