import { connect } from 'react-redux';
import { sendMessagesAction, editMessageAction } from '../../store/actions/actions';
import { getMessagesReselect } from '../../store/selectors/chat.selector';
import Chat from './Chat';

export const mapStateToProps = state => ({
  messages: getMessagesReselect(state),
});

const mapDispatchToProps = dispatch => ({
  sendMessages: message => dispatch(sendMessagesAction(message)),
  editMessage: (message, idMessage) => dispatch(editMessageAction(message, idMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
