import { ADD_USER_NAME, ADD_REDIRECT, ADD_OPEN_MODAL } from '../actions/actions';

export default function auth(state = { userName: '', redirect: null, open: false }, { type, payload }) {
  switch (type) {
    case ADD_USER_NAME:
      return {
        ...state,
        userName: payload,
      };
    case ADD_REDIRECT:
      return {
        ...state,
        redirect: payload,
      };
    case ADD_OPEN_MODAL:
      return {
        ...state,
        open: payload,
      };
    default:
      return state;
  }
}
