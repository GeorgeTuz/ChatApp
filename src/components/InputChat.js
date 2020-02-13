import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
  formInput: {
    wordWrap: 'break-word',
    width: '540px',
    height: '60px',
    border: 'none',
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
    backgroundImage: "url('https://svgsilh.com/svg/2112207.svg')",
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
    const { classes, onSubmit, onChange, value } = this.props;
    return (
      <div className={classes.formChat}>
        <div className={classes.chatButton}></div>
        <form onSubmit={onSubmit}>
          <input
            className={classes.formInput}
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
};

InputChat.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  classes: {},
  value: '',
};

export default withStyles(useStyles)(InputChat);
