import { testSaga } from 'redux-saga-test-plan';
// eslint-disable-next-line import/named
import { init } from './index';
import BackendServices from '../../BackendServices/backendServices';

const getMess = [1, 2, 3];
it('works with unit tests', () => {
  testSaga(init)
    .next()
    .call(BackendServices.getMessages)
    .next(getMess)
    .put({ type: 'ADD_MESSAGES', payload: getMess })
    .next()
    .isDone();
});
