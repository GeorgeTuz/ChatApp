import { connect } from 'react-redux';
import { addOpenModalAction, addRedirectAction, addUserNameAction, signInAction } from '../../store/actions/actions';
import Auth from './Auth';

const mapStateToProps = state => ({
  userName: state.auth.userName,
  redirect: state.auth.redirect,
  isModalOpen: state.auth.open,
});

const mapDispatchToProps = dispatch => ({
  addUserNameDis: userName => dispatch(addUserNameAction(userName)),
  addRedirectDis: redirect => dispatch(addRedirectAction(redirect)),
  addOpenModalDis: isModalOpen => dispatch(addOpenModalAction(isModalOpen)),
  signIn: () => dispatch(signInAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
