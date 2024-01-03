import { inject, Injectable } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';

import { CategoryDto } from '../dto';
import { CategoryModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private db = inject(Database);

  constructor() {}

  async getCategoriesByRestaurant(restaurantId: string) {
    const refCategory = ref(this.db, `restaurantCategories/${restaurantId}`);
    const snap = await get(refCategory);
    const categories = snap.val();
    return Object.keys(categories)
      .map((key) => ({ ...categories[key], uid: key }) as CategoryModel)
      .map((category) => new CategoryDto(category));
  }
}
