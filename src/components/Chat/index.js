import { connect } from 'react-redux';
import { sendMessages } from '../../store/actions/actions';
import { getMessagesReselect } from '../../store/selectors/chat.selector';
import Chat from './Chat';

export const mapStateToProps = state => ({
  messages: getMessagesReselect(state),
});

const mapDispatchToProps = dispatch => ({
  sendMessages: messages => dispatch(sendMessages(messages)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);