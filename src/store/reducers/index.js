import { combineReducers } from 'redux';
import reducerChat from './reducerChat';
import reducerAuth from './reducerAuth';

const combine = combineReducers({
  reducerChat,
  reducerAuth,
});
export default combine;
