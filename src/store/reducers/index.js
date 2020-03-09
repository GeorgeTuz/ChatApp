import { combineReducers } from 'redux';
import chat from './chat.reducer';
import auth from './auth.reducer';

const combine = combineReducers({
  chat,
  auth,
});
export default combine;
