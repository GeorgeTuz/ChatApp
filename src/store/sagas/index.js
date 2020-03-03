import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { addMessagesAction, addOpenModalAction, addRedirectAction } from '../actions/actions';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const host = 'http://localhost:4000/api';
const usersRoue = '/users';
const messagesRoue = '/messages';
const userRoue = '/user';
const messageRoue = '/message';

const getUserNameSelect = state => state.auth.userName;

function* setDataUsersInLocalStorage() {
  const response = yield call(() =>
    fetch(`${host}${usersRoue}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
  );
  const result = yield response.text();
  const usersList = JSON.parse(result);
  localStorage.setItem('userId', usersList[usersList.length - 1].id);
  localStorage.setItem('userName', usersList[usersList.length - 1].name);
}

export function* getMessages() {
  const response = yield call(() =>
    fetch(`${host}${messagesRoue}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
  );
  const messages = yield response.text();
  return JSON.parse(messages);
}

function* postDataUser(userName) {
  yield call(() =>
    fetch(`${host}${userRoue}`, {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({
        name: userName,
        avatar: 'IMAGE',
      }),
    })
  );
}

function* postMessage(newMessage, userId, userName) {
  yield call(() =>
    fetch(`${host}${messageRoue}`, {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({
        message: newMessage,
        userId,
        userName,
      }),
    })
  );
}

function* editMessage(newMessage, idMessage) {
  yield call(() =>
    fetch(`${host}${messageRoue}`, {
      method: 'put',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({
        message: newMessage,
        id: idMessage,
      }),
    })
  );
}

export function* init() {
  const getMess = yield call(getMessages);
  yield put(addMessagesAction(getMess));
}

function* sendMessagesWorker(action) {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  yield call(postMessage, action.payload, userId, userName);
  const getMess = yield call(getMessages);
  yield put(addMessagesAction(getMess));
}

export function* sendMessagesWatcher() {
  yield takeEvery('SEND_MESSAGE', sendMessagesWorker);
}

function* signInWorker() {
  const userName = yield select(getUserNameSelect);
  const validation = userName.match(/[A-Za-z0-9]+/);
  if (!validation) {
    yield put(addOpenModalAction(true));
  } else if (validation[0].length === userName.length) {
    yield call(postDataUser, userName);
    yield call(setDataUsersInLocalStorage);
    yield put(addRedirectAction('/chat'));
  } else {
    yield put(addOpenModalAction(true));
  }
}

export function* signInWatcher() {
  yield takeEvery('SIGN_IN', signInWorker);
}

function* editMessageWorker(action) {
  yield call(editMessage, action.payload, action.idMessage);
  const getMess = yield call(getMessages);
  yield put(addMessagesAction(getMess));
}

export function* editMessageWatcher() {
  yield takeEvery('EDIT_MESSAGE', editMessageWorker);
}

export default function* rootSaga() {
  yield all([init(), sendMessagesWatcher(), signInWatcher(), editMessageWatcher()]);
}
