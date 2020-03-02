import { ADD_MESSAGES, ADD_NEW_MESSAGE, EDIT_MESSAGE, ID_MESSAGE } from '../actions/actions';

export default function chat(
  state = { messages: [], newMessage: '', editMessage: '', idMessage: '' },
  { type, payload }
) {
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
    case EDIT_MESSAGE:
      return {
        ...state,
        editMessage: payload,
      };
    case ID_MESSAGE:
      return {
        ...state,
        idMessage: payload,
      };
    default:
      return state;
  }
}
