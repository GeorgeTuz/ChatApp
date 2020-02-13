import { ADD_MESSAGES, ADD_NEW_MESSAGE } from '../actions/actions';

export default function reducerChat(state = { messages: [], newMessage: '' }, action) {
  switch (action.type) {
    case ADD_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        newMessage: action.newMessage,
      };
    default:
      return state;
  }
}
