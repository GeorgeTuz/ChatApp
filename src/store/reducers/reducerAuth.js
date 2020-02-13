import { ADD_USER_NAME, ADD_REDIRECT } from '../actions/actions';

export default function reducerAuth(state = { userName: '', redirect: null }, action) {
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
    default:
      return state;
  }
}
