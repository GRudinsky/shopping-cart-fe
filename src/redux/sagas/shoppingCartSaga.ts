import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest
} from 'redux-saga/effects';
import { getShoppingCart } from '../../utils/services';
import { fetchCart, FetchCartFailure, fetchCartSuccess } from '../actions';
import { ShoppingCartResponse } from '../types';

function* fetchShoppingCart(): Generator<
  | CallEffect<Response>
  | PutEffect<{ payload: ShoppingCartResponse; type: string }>,
  void
> {
  try {
    const response: any = yield call(getShoppingCart);

    yield put(fetchCartSuccess(response));
  } catch (e: any) {
    yield put(FetchCartFailure(e.message));
  }
}

export default function* shoppingCartSaga() {
  yield takeLatest(fetchCart.type, fetchShoppingCart);
}
