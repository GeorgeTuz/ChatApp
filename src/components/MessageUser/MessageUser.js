import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const useStyles = () => ({
  messageUser: {
    maxWidth: '400px',
    wordWrap: 'break-word',
    backgroundColor: 'rgb(196, 113, 196)',
    borderRadius: '13px 17px 0px 13px',
    padding: '15px',
    margin: '5px 30px',
    color: 'white',
  },
  messageContainerUser: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
});

class MessageUser extends React.Component {
  render() {
    const { classes } = this.props;
    const { message } = this.props;
    return (
      <div className={classes.messageContainerUser}>
        <div className={classes.messageUser}>{message}</div>
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
