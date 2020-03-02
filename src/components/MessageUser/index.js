import { connect } from 'react-redux';
import { editMessageAction, idMessageAction } from '../../store/actions/actions';
import MessageUser from './MessageUser';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  editMessageDis: editMessage => dispatch(editMessageAction(editMessage)),
  idMessageDis: idMessage => dispatch(idMessageAction(idMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageUser);
