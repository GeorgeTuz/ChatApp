export const ADD_MESSAGES = 'ADD_MESSAGES';
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
export const ADD_USER_NAME = 'ADD_USER_NAME';
export const ADD_REDIRECT = 'ADD_REDIRECT';
export const ADD_OPEN_MODAL = 'ADD_OPEN_MODAL';

export function addMessages(messages) {
  return { type: ADD_MESSAGES, messages };
}
export function addNewMessage(newMessage) {
  return { type: ADD_NEW_MESSAGE, newMessage };
}
export function addUserName(userName) {
  return { type: ADD_USER_NAME, userName };
}
export function addRedirect(redirect) {
  return { type: ADD_REDIRECT, redirect };
}
export function addOpenModal(open) {
  return { type: ADD_OPEN_MODAL, open };
}
