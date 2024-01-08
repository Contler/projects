import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { CartModel } from '../../models';

import * as CartActions from './cart.actions';

export const CART_FEATURE_KEY = 'cart';

export interface CartState extends EntityState<CartModel> {}

export interface CartPartialState {
  readonly [CART_FEATURE_KEY]: CartState;
}

export const cartAdapter: EntityAdapter<CartModel> = createEntityAdapter<CartModel>({
  selectId: (model) => model.id,
});

export const initialCartState: CartState = cartAdapter.getInitialState({});

const reducer = createReducer(
  initialCartState,
  on(CartActions.addItemToCart, (state, { item }) => cartAdapter.addOne(item, state)),
);

export function cartReducer(state: CartState | undefined, action: Action) {
  return reducer(state, action);
}
