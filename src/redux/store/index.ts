import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';

const sagaMiddleWare = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleWare]
});

sagaMiddleWare.run(rootSaga);

export default store;
