import { ADD_USER_NAME, ADD_REDIRECT, ADD_OPEN_MODAL } from '../actions/actions';

export default function reducerAuth(state = { userName: '', redirect: null, open: false }, action) {
  switch (action.type) {
    case ADD_USER_NAME:
      return {
        ...state,
        userName: action.userName,
      };
    case ADD_REDIRECT:
      return {
        ...state,
        redirect: action.redirect,
      };
    case ADD_OPEN_MODAL:
      return {
        ...state,
        open: action.open,
      };
    default:
      return state;
  }
}
