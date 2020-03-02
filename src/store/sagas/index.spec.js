import { testSaga, expectSaga } from 'redux-saga-test-plan';
// eslint-disable-next-line import/named
import { getMessages, init } from './index';

jest.mock('./index', () => () => {});

const getMess = [1, 2, 3];

it('Test init saga use expectSaga for mock call', () =>
  expectSaga(init)
    .provide({
      call({ fn }, next) {
        if (fn === getMessages) {
          return getMess;
        }
        return next();
      },
    })
    .put({
      type: 'ADD_MESSAGES',
      payload: getMess,
    })
    .run());

it('Test init saga use testSaga and mock with jest', () => {
  testSaga(init)
    .next()
    .call(getMessages)
    .next(getMess)
    .put({ type: 'ADD_MESSAGES', payload: getMess })
    .next()
    .isDone();
});
