import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import userAvatar from '../../assets/avatar.jpg';

const useStyles = () => ({
  headerChat: {
    display: 'flex',
    margin: '0 auto',
    width: '700px',
    height: '60px',
    backgroundColor: '#f5f5f5',
    fontSize: '17px',
    fontWeight: 'bold',
    color: 'rgb(66, 66, 66)',
    fontFamily: "'Montserrat', sans-serif",
  },
  userNameHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '60px',
    width: '570px',
  },
  photoUserHeader: {
    backgroundImage: `url(${userAvatar})`,
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: 'auto 0',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
});

class HeaderChat extends React.PureComponent {
  render() {
    const { classes } = this.props;
    const { userName } = this.props;
    return (
      <div className={classes.headerChat}>
        <div className={classes.userNameHeader}>{userName}</div>
        <div className={classes.photoUserHeader} />
      </div>
    );
  }
}

HeaderChat.propTypes = {
  userName: PropTypes.string,
  classes: PropTypes.object,
};

HeaderChat.defaultProps = {
  userName: '',
  classes: {},
};

export default withStyles(useStyles)(HeaderChat);
