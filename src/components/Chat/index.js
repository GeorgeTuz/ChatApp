import { connect } from 'react-redux';
import { sendMessagesAction } from '../../store/actions/actions';
import { getMessagesReselect } from '../../store/selectors/chat.selector';
import Chat from './Chat';

export const mapStateToProps = state => ({
  messages: getMessagesReselect(state),
});

const mapDispatchToProps = dispatch => ({
  sendMessages: messages => dispatch(sendMessagesAction(messages)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
