import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import BackendServices from '../BackendServices/backendServices';
import { addUserName, addRedirect } from '../store/actions/actions';

const useStyles = () => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(./../../assets/authImage.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: '8px 4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    margin: '1px',
  },
  form: {
    width: '100%',
    marginTop: '1px',
  },
  submit: {
    margin: '3px 0px 2px',
  },
  MuiPaperRoot: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto 0',
    padding: '20px',
  },
});

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.addUserNameDis(event.target.value);
  }

  async handleSubmit(event) {
    event.preventDefault();
    await BackendServices.postDataUser(this.props.state.reducerAuth.userName);
    await BackendServices.setDataUsersInLocalStorage();
    await this.props.addRedirectDis('/chat');
  }

  render() {
    const { classes, state } = this.props;
    if (state.reducerAuth.redirect) {
      return <Redirect to={state.reducerAuth.redirect} />;
    }
    return (
      <div>
        <Grid container component="main" className={classes.formInput} root>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  autoFocus
                  value={state.reducerAuth.userName}
                  onChange={this.handleChange}
                />

                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Sign In
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUserNameDis: userName => dispatch(addUserName(userName)),
  addRedirectDis: redirect => dispatch(addRedirect(redirect)),
});

Auth.propTypes = {
  state: PropTypes.object,
  classes: PropTypes.object,
  addUserNameDis: PropTypes.func,
  addRedirectDis: PropTypes.func,
};

Auth.defaultProps = {
  state: {},
  classes: {},
  addUserNameDis: () => {},
  addRedirectDis: () => {},
};

export default withStyles(useStyles)(connect(state => ({ state }), mapDispatchToProps)(Auth));
