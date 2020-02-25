import { call, put, all, select, takeEvery } from 'redux-saga/effects';
import BackendServices from '../../BackendServices/backendServices';
import { addMessages, addOpenModal, addRedirect } from '../actions/actions';

const getNewMessageSelect = state => state.chat.newMessage;
const getUserNameSelect = state => state.auth.userName;

export function* init() {
  const getMess = yield call(BackendServices.getMessages);
  yield put(addMessages(getMess));
}

function* sendMessagesWorker() {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const newMessage = yield select(getNewMessageSelect);
  yield call(BackendServices.postMessage, newMessage, userId, userName);

  yield put({ type: 'SEND_MESSAGE_SUCCESS' });
  const getMess = yield call(BackendServices.getMessages);
  yield put(addMessages(getMess));
}

export function* sendMessagesWatcher() {
  yield takeEvery('SEND_MESSAGE', sendMessagesWorker);
}

function* signInWorker() {
  const userName = yield select(getUserNameSelect);
  const validation = userName.match(/[A-Za-z0-9]+/);
  if (!validation) {
    yield put(addOpenModal(true));
  } else if (validation[0].length === userName.length) {
    yield call(BackendServices.postDataUser, userName);
    yield call(BackendServices.setDataUsersInLocalStorage);
    yield put(addRedirect('/chat'));
  } else {
    yield put(addOpenModal(true));
  }
}

export function* signInWatcher() {
  yield takeEvery('SIGN_IN', signInWorker);
}

export default function* rootSaga() {
  yield all([init(), sendMessagesWatcher(), signInWatcher()]);
}