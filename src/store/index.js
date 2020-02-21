import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import combine from './reducers';
import mySaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
// eslint-disable-next-line import/prefer-default-export
// export const store = createStore(combine, applyMiddleware(sagaMiddleware));
export const store = createStore(combine, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
));
// then run the saga
sagaMiddleware.run(mySaga);
