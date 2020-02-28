import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import camera from '../../assets/camera.png';

const useStyles = () => ({
  formChat: {
    display: 'flex',
    margin: '0 auto',
    width: '640px',
    height: '60px',
    border: 'none',
    backgroundColor: '#f5f5f5',
    fontSize: '17px',
    color: 'rgb(66, 66, 66)',
    padding: '0 30px',
    fontFamily: "'Montserrat', sans-serif",
  },
  inputValid: {
    border: '2px solid #f5f5f5',
  },
  inputNotValid: {
    border: '2px solid red',
  },
  formInput: {
    wordWrap: 'break-word',
    width: '536px',
    height: '56px',
    backgroundColor: '#f5f5f5',
    fontSize: '17px',
    color: 'rgb(66, 66, 66)',
    padding: '0 30px',
    fontFamily: "'Montserrat', sans-serif",
    '&:active': {
      outline: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    '&::placeholder': {
      color: 'rgb(156, 156, 156)',
    },
  },
  chatButton: {
    width: '25px',
    background: 0,
    backgroundImage: `url(${camera})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    outline: 'none',
    '&:active': {
      border: 'none',
      outline: 'none',
    },
    '&:focus': {
      border: 'none',
      outline: 'none',
    },
    '&:hover': {
      border: 'none',
      outline: 'none',
    },
  },
});

class InputChat extends React.Component {
  render() {
    const { classes, onSubmit, onChange, value, isValid } = this.props;
    return (
      <div className={classes.formChat}>
        <div className={classes.chatButton} />
        <form onSubmit={onSubmit}>
          <input
            className={`${classes.formInput} ${isValid ? classes.inputValid : classes.inputNotValid}`}
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Chat something..."
          />
        </form>
      </div>
    );
  }
}

InputChat.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  isValid: PropTypes.bool,
};

InputChat.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  classes: {},
  value: '',
  isValid: true,
};

export default withStyles(useStyles)(InputChat);
