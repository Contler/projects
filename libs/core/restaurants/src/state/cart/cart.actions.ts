import { createAction, props } from '@ngrx/store';

import { CartModel } from '../../models';

export const addItemToCart = createAction('[Cart Page] Add Item', props<{ item: CartModel }>());
