import { connect } from 'react-redux';
import { addOpenModalAction, addUserNameAction, signInAction } from '../../store/actions/actions';
import Auth from './Auth';

const mapStateToProps = state => ({
  userName: state.auth.userName,
  redirect: state.auth.redirect,
  isModalOpen: state.auth.open,
});

const mapDispatchToProps = dispatch => ({
  addUserNameDis: userName => dispatch(addUserNameAction(userName)),
  addOpenModalDis: isModalOpen => dispatch(addOpenModalAction(isModalOpen)),
  signIn: image => dispatch(signInAction(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
