import { connect } from 'react-redux';
import { addOpenModal, addRedirect, addUserName, signIn } from '../../store/actions/actions';
import Auth from './Auth';

const mapStateToProps = state => ({
  userName: state.auth.userName,
  redirect: state.auth.redirect,
  isModalOpen: state.auth.open,
});

const mapDispatchToProps = dispatch => ({
  addUserNameDis: userName => dispatch(addUserName(userName)),
  addRedirectDis: redirect => dispatch(addRedirect(redirect)),
  addOpenModalDis: isModalOpen => dispatch(addOpenModal(isModalOpen)),
  signIn: () => dispatch(signIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
