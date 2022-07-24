import { combineReducers } from 'redux';
import { initialState } from './initialState';
import { GlobalState, Product, ShoppingCartActions } from '../types';
import { ActionTypes } from '../actions';

const logActionType = (action: ActionTypes, payload?: any) =>
  console.log(`%c action ${action} payload::`, 'font-weight: bold', payload);

export const shoppingCart = (
  state: GlobalState,
  action: ShoppingCartActions
): GlobalState => {
  const getCartSubTotal = (state: GlobalState) =>
    state.products?.reduce((acc: number, item: any) => {
      acc = acc + item.price * item.qty;
      return acc;
    }, 0);

  logActionType(action.type, action.payload);
  switch (action.type) {
    case ActionTypes.FETCH_SHOPPING_CART_SUCCESS:
      state = {
        ...initialState,
        products: action.payload.products,
        currency: action.payload.currency
      };
      state.cartSubTotal = getCartSubTotal(state);
      return state;
    case ActionTypes.FETCH_SHOPPING_CART_FAILURE:
      return { ...initialState, error: action.payload };
    case ActionTypes.CHANGE_PRODUCT_QTY:
      let newState = { ...state };
      let targetProduct = newState?.products?.find(
        (product) => product.id === action.payload.id
      ) as Product;
      targetProduct.qty = action.payload.qty;
      newState.cartSubTotal = getCartSubTotal(newState);
      return newState;
    case ActionTypes.CLEAR_SHOPPING_CART:
      return {
        ...state,
        products: state?.products?.map((product) => ({ ...product, qty: 0 })),
        cartSubTotal: 0
      };
    default:
      return initialState;
  }
};

export const rootReducer = combineReducers({
  shoppingCart
});
