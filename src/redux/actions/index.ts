import { createAction } from '@reduxjs/toolkit';
import { ShoppingCartResponse } from '../types';

export enum ActionTypes {
  CHANGE_PRODUCT_QTY = 'CHANGE_PRODUCT_QTY',
  CLEAR_SHOPPING_CART = 'CLEAR_SHOPPING_CART',
  FETCH_SHOPPING_CART = 'FETCH_SHOPPING_CART',
  FETCH_SHOPPING_CART_SUCCESS = 'FETCH_SHOPPING_CART_SUCCESS',
  FETCH_SHOPPING_CART_FAILURE = 'FETCH_SHOPPING_CART_FAILURE'
}

export type ShoppingCartPayloads = {
  [ActionTypes.CHANGE_PRODUCT_QTY]: { id: number; qty: number };
  [ActionTypes.CLEAR_SHOPPING_CART]: undefined;
  [ActionTypes.FETCH_SHOPPING_CART]: undefined;
  [ActionTypes.FETCH_SHOPPING_CART_SUCCESS]: ShoppingCartResponse;
  [ActionTypes.FETCH_SHOPPING_CART_FAILURE]: string;
};

export const changeProductQty = createAction<
  ShoppingCartPayloads[ActionTypes.CHANGE_PRODUCT_QTY]
>(ActionTypes.CHANGE_PRODUCT_QTY);

export const clearCart = createAction(ActionTypes.CLEAR_SHOPPING_CART);

export const fetchCart = createAction(ActionTypes.FETCH_SHOPPING_CART);

export const fetchCartSuccess = createAction<
  ShoppingCartPayloads[ActionTypes.FETCH_SHOPPING_CART_SUCCESS]
>(ActionTypes.FETCH_SHOPPING_CART_SUCCESS);

export const FetchCartFailure = createAction<
  ShoppingCartPayloads[ActionTypes.FETCH_SHOPPING_CART_SUCCESS]
>(ActionTypes.FETCH_SHOPPING_CART_SUCCESS);
