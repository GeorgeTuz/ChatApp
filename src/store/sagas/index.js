import { call, put, all, select, takeEvery } from "redux-saga/effects";
import BackendServices from "../../BackendServices/backendServices";
import { addMessagesAction, addOpenModalAction, addRedirectAction } from "../actions/actions";

const getUserNameSelect = state => state.auth.userName;

export function* init() {
  const getMess = yield call(BackendServices.getMessages);
  yield put(addMessagesAction(getMess));
}

function* sendMessagesWorker(action) {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  yield call(BackendServices.postMessage, action.payload, userId, userName);
  const getMess = yield call(BackendServices.getMessages);
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
    yield call(BackendServices.postDataUser, userName);
    yield call(BackendServices.setDataUsersInLocalStorage);
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
