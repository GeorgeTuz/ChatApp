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
import imageAuth from '../../assets/authImage.jpg';
import ModalWindow from '../ModalWindow/ModalWindow';

const useStyles = () => ({
  '@global': {
    '.MuiGrid-container': {
      height: '100vh',
    },
    '.MuiPaper-root': {
      display: 'flex',
      alignItems: 'center',
    },
    '.Auth-paper-3': {
      padding: '8px 4px',
      margin: 0,
    },
  },
  image: {
    backgroundImage: `url(${imageAuth})`,
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
  'MuiPaper-root': {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto 0',
    padding: '20px',
  },
});

class Auth extends React.Component {
  handleClose = () => {
    this.props.addOpenModalDis(false);
  };

  handleChange = event => {
    this.props.addUserNameDis(event.target.value);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.signIn();
  }

  fileSelectedHendler = event => {
    console.log(event.target.files[0]);
  };

  render() {
    const { classes, redirect, userName, isModalOpen } = this.props;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <div>
        <Grid container component="main" className={classes.formInput}>
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
                  ref={this.inputRef}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  autoFocus
                  value={userName}
                  onChange={this.handleChange}
                />
                <input type="file" onChange={this.fileSelectedHendler} />
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Sign In
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
        <ModalWindow open={isModalOpen} onClose={this.handleClose} />
      </div>
    );
  }
}

Auth.propTypes = {
  userName: PropTypes.string.isRequired,
  redirect: PropTypes.string,
  isModalOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  addUserNameDis: PropTypes.func,
  addRedirectDis: PropTypes.func,
  addOpenModalDis: PropTypes.func,
  signIn: PropTypes.func,
};

Auth.defaultProps = {
  userName: '',
  redirect: '',
  isModalOpen: false,
  classes: {},
  addUserNameDis: () => {},
  addRedirectDis: () => {},
  addOpenModalDis: () => {},
  signIn: () => {},
};

export default withStyles(useStyles)(Auth);
