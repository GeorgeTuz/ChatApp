import { ADD_MESSAGES } from '../actions/actions';

export default function chat(state = { messages: [] }, { type, payload }) {
  switch (type) {
    case ADD_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    default:
      return state;
  }
}
