import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RestaurantDto } from '../../dto';
import { CartModel } from '../../models';

import { CART_FEATURE_KEY, CartState, cartAdapter } from './cart.reducer';

// Lookup the 'Cart' feature state managed by NgRx
export const selectCartState = createFeatureSelector<CartState>(CART_FEATURE_KEY);

const { selectAll, selectEntities } = cartAdapter.getSelectors();

export const selectAllCart = createSelector(selectCartState, (state: CartState) => selectAll(state));

export const selectCartEntities = createSelector(selectCartState, (state: CartState) => selectEntities(state));

export const selectTotal = createSelector(selectAllCart, (cart) =>
  cart.reduce((acc, item) => acc + item.quantity * Number(item.product.value), 0),
);

export const selectCartItemsByRestaurant = createSelector(selectAllCart, (cart) => {
  const cartItemsByRestaurant: { restaurant: RestaurantDto; items: CartModel[] }[] = [];
  cart.forEach((cartItem) => {
    const restaurant = cartItemsByRestaurant.find((item) => item.restaurant?.uid === cartItem?.restaurant?.uid);
    console.log(cartItem);

    if (restaurant) {
      restaurant.items.push(cartItem);
    } else {
      cartItemsByRestaurant.push({
        restaurant: cartItem.restaurant as RestaurantDto,
        items: [cartItem],
      });
    }
  });

  return cartItemsByRestaurant;
});
