import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import editMessageImg from '../../assets/editMessageIcon.png';

const useStyles = () => ({
  messageUser: {
    position: 'relative',
    maxWidth: '400px',
    wordWrap: 'break-word',
    backgroundColor: 'rgb(196, 113, 196)',
    borderRadius: '13px 17px 0px 13px',
    padding: '15px',
    paddingRight: '28px',
    margin: '5px 30px',
    color: 'white',
  },
  messageContainerUser: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
  editMessageButton: {
    width: '13px',
    height: '13px',
    position: 'absolute',
    top: '5px',
    right: '7px',
    background: 'none',
    backgroundImage: `url(${editMessageImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    outline: 'none',
  },
});

class MessageUser extends React.Component {
  render() {
    const { classes } = this.props;
    const { message } = this.props;
    return (
      <div className={classes.messageContainerUser}>
        <div className={classes.messageUser}>
          {message}
          <button type="button" className={classes.editMessageButton} aria-label="Edit Message" />
        </div>
      </div>
    );
  }
}

MessageUser.propTypes = {
  message: PropTypes.string,
  classes: PropTypes.object,
};

MessageUser.defaultProps = {
  classes: {},
  message: '',
};

export default withStyles(useStyles)(MessageUser);
