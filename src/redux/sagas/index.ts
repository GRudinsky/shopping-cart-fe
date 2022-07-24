import { all, fork } from 'redux-saga/effects';
import shoppingCartSaga from './shoppingCartSaga';

export function* rootSaga() {
  yield all([fork(shoppingCartSaga)]);
}
