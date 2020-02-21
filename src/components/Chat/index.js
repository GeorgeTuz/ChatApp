import { connect } from 'react-redux';
import { addMessages, addNewMessage, sendMessages } from '../../store/actions/actions';
import { getMessagesReselect } from '../../store/selectors/chat.selector';
import Chat from './Chat';

export const mapStateToProps = state => ({
  messages: getMessagesReselect(state),
  newMessage: state.chat.newMessage,
});

const mapDispatchToProps = dispatch => ({
  addMessages: messages => dispatch(addMessages(messages)),
  addNewMessage: newMessage => dispatch(addNewMessage(newMessage)),
  sendMessages: () => dispatch(sendMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
