import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CART_FEATURE_KEY, CartState, cartAdapter } from './cart.reducer';

// Lookup the 'Cart' feature state managed by NgRx
export const selectCartState = createFeatureSelector<CartState>(CART_FEATURE_KEY);

const { selectAll, selectEntities } = cartAdapter.getSelectors();

export const selectAllCart = createSelector(selectCartState, (state: CartState) => selectAll(state));

export const selectCartEntities = createSelector(selectCartState, (state: CartState) => selectEntities(state));

export const selectTotal = createSelector(selectAllCart, (cart) =>
  cart.reduce((acc, item) => acc + item.quantity * Number(item.product.value), 0),
);
