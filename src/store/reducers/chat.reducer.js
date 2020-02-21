import { ADD_MESSAGES, ADD_NEW_MESSAGE } from '../actions/actions';

export default function chat(state = { messages: [], newMessage: '' }, { type, payload }) {
  switch (type) {
    case ADD_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        newMessage: payload,
      };
    case 'SEND_MESSAGE_SUCCESS':
      return {
        ...state,
        newMessage: '',
      };
    default:
      return state;
  }
}
