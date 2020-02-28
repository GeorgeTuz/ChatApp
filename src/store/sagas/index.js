import { call, put, all, select, takeEvery } from "redux-saga/effects";
import { addMessagesAction, addOpenModalAction, addRedirectAction } from "../actions/actions";

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const host = 'http://localhost:4000/api';
const usersRoue = '/users';
const messagesRoue = '/messages';
const userRoue = '/user';
const messageRoue = '/message';

const getUserNameSelect = state => state.auth.userName;

function dataRequest(url, data) {
  return fetch(`${host}${url}`, {
    ...data,
  }).then(response => response.text());
}

const setDataUsersInLocalStorage = () =>
    dataRequest(usersRoue, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }).then(result => {
      localStorage.setItem('userId', JSON.parse(result)[JSON.parse(result).length - 1].id);
      localStorage.setItem('userName', JSON.parse(result)[JSON.parse(result).length - 1].name);
    });

const getMessages = () =>
    dataRequest(messagesRoue, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }).then(messages => JSON.parse(messages));

const postDataUser = userName =>
    dataRequest(userRoue, {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({
        name: userName,
        avatar: 'IMAGE',
      }),
    });

const postMessage = (newMessage, userId, userName) =>
    dataRequest(messageRoue, {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({
        message: newMessage,
        userId,
        userName,
      }),
    });

export function* init() {
  const getMess = yield call(getMessages);
  yield put(addMessagesAction(getMess));
}

function* sendMessagesWorker(action) {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  yield call(postMessage, action.payload, userId, userName);
  const getMess = yield call(getMessages);
  yield put(addMessagesAction(getMess));
}

export function* sendMessagesWatcher() {
  yield takeEvery("SEND_MESSAGE", sendMessagesWorker);
}

function* signInWorker() {
  const userName = yield select(getUserNameSelect);
  const validation = userName.match(/[A-Za-z0-9]+/);
  if (!validation) {
    yield put(addOpenModalAction(true));
  } else if (validation[0].length === userName.length) {
    yield call(postDataUser, userName);
    yield call(setDataUsersInLocalStorage);
    yield put(addRedirectAction("/chat"));
  } else {
    yield put(addOpenModalAction(true));
  }
}

export function* signInWatcher() {
  yield takeEvery("SIGN_IN", signInWorker);
}

export default function* rootSaga() {
  yield all([init(), sendMessagesWatcher(), signInWatcher()]);
}
