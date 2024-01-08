import { inject, Injectable } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';

import { FormModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  private db = inject(Database);

  constructor() {}

  async getForm(formId: string) {
    const formRef = ref(this.db, `form/${formId}`);
    const formSnapshot = await get(formRef);
    return formSnapshot.val() as FormModel;
  }
}
