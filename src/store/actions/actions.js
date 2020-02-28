export const ADD_MESSAGES = 'ADD_MESSAGES';
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
export const ADD_USER_NAME = 'ADD_USER_NAME';
export const ADD_REDIRECT = 'ADD_REDIRECT';
export const ADD_OPEN_MODAL = 'ADD_OPEN_MODAL';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SIGN_IN = 'SIGN_IN';

export function addMessagesAction(messages) {
  return { type: ADD_MESSAGES, payload: messages };
}
export function addNewMessageAction(newMessage) {
  return { type: ADD_NEW_MESSAGE, payload: newMessage };
}
export function addUserNameAction(userName) {
  return { type: ADD_USER_NAME, payload: userName };
}
export function addRedirectAction(redirect) {
  return { type: ADD_REDIRECT, payload: redirect };
}
export function addOpenModalAction(open) {
  return { type: ADD_OPEN_MODAL, payload: open };
}
export function sendMessagesAction(messages) {
  return { type: SEND_MESSAGE, payload: messages };
}
export function signInAction() {
  return { type: SIGN_IN, payload: null };
}
