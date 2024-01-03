import { CategoryModel } from './category.model';
import { ProductModel } from './product.model';

export interface ProductsCategoryModel {
  category: CategoryModel;
  products: ProductModel[];
}
