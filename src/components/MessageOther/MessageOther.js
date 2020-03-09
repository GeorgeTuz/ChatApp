import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import userAvatar from '../../assets/avatar.jpg';

const useStyles = () => ({
  messageOther: {
    maxWidth: '400px',
    wordWrap: 'break-word',
    padding: '12px',
    margin: '5px',
    color: 'white',
    backgroundColor: 'rgb(113, 180, 196)',
    borderRadius: '17px 13px 13px 0px',
  },
  messageContainerOther: {
    display: 'flex',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    margin: '10px 0',
  },
  photoMessage: {
    backgroundImage: `url(${userAvatar})`,
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: '0 10px',
    marginTop: '9px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  userName: {
    fontWeight: 'bold',
    color: 'grey',
    paddingBottom: '5px',
  },
});

class MessageOther extends React.PureComponent {
  render() {
    const { classes } = this.props;
    const { message } = this.props;
    const { userName } = this.props;
    return (
      <div className={classes.messageContainerOther}>
        <div className={classes.photoMessage} />
        <div className={classes.messageOther}>
          <div className={classes.userName}>{userName}</div>
          <div>{message}</div>
        </div>
      </div>
    );
  }
}

MessageOther.propTypes = {
  message: PropTypes.string,
  classes: PropTypes.object,
  userName: PropTypes.string,
};

MessageOther.defaultProps = {
  message: '',
  classes: {},
  userName: '',
};

export default withStyles(useStyles)(MessageOther);
