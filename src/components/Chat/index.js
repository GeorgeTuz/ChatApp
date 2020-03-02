import { connect } from 'react-redux';
import { sendMessagesAction, editMessageFuncAction, editMessageAction } from '../../store/actions/actions';
import { getMessagesReselect } from '../../store/selectors/chat.selector';
import Chat from './Chat';

export const mapStateToProps = state => ({
  messages: getMessagesReselect(state),
  editMessage: state.chat.editMessage,
  idMessage: state.chat.idMessage,
});

const mapDispatchToProps = dispatch => ({
  sendMessages: message => dispatch(sendMessagesAction(message)),
  editMessageDis: editMessage => dispatch(editMessageAction(editMessage)),
  editMessageFunc: message => dispatch(editMessageFuncAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
