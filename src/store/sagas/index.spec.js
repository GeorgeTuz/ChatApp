import { testSaga, expectSaga } from 'redux-saga-test-plan';
// eslint-disable-next-line import/named
import { init } from './index';
import BackendServices from '../../BackendServices/backendServices';

jest.mock('../../BackendServices/backendServices', () => ({getMessages: () => {}}));

const getMess = [1, 2, 3];

it('1', () => {
  return expectSaga(init)
      .provide({
        call({ fn }, next) {
          if (fn === BackendServices.getMessages) {
            return getMess;
          }
          return next();
        },
      })
      .put({
        type: 'ADD_MESSAGES',
        payload: getMess,
      })
      .run();
});

it('2', () => {
  testSaga(init)
      .next()
      .call(BackendServices.getMessages)
      .next(getMess)
      .put({ type: 'ADD_MESSAGES', payload: getMess })
      .next()
      .isDone();
});