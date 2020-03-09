import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import combine from './reducers';
import mySaga from './sagas';
import actionsLogMiddleware from './actionsLogMiddleware';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
// eslint-disable-next-line import/prefer-default-export
// export const store = createStore(combine, applyMiddleware(sagaMiddleware));
// eslint-disable-next-line import/prefer-default-export
export const store = createStore(combine, composeWithDevTools(applyMiddleware(sagaMiddleware, actionsLogMiddleware)));
// then run the saga
sagaMiddleware.run(mySaga);
