import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import notAvatar from '../../assets/notAvatar.jpg';

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
    width: '515px',
  },
  photoUserHeader: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: 'auto 0',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  buttonSave: {
    textDecoration: 'none',
    color: 'rgb(66, 66, 66)',
    padding: '3px',
    margin: '15px 5px',
    backgroundColor: '#cecdcd',
    cursor: 'pointer',
  },
});

class HeaderChat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.buttonSave = React.createRef();
  }

  clickSaveButton = () => {
    const buttonSave = this.buttonSave.current;
    buttonSave.removeAttribute('href', '');
    buttonSave.removeAttribute('download');
    let avatar = localStorage.getItem('avatar');
    if (!avatar) avatar = notAvatar;
    const isSave = window.confirm('Did you want to save this image?');
    if (isSave) {
      buttonSave.setAttribute('href', avatar);
      buttonSave.setAttribute('download', 'avatarImage.jpg');
    }
  };

  render() {
    const { classes } = this.props;
    const { userName } = this.props;
    let avatar = localStorage.getItem('avatar');
    if (!avatar) avatar = notAvatar;
    const style = { backgroundImage: `url(${avatar})` };
    return (
      <div className={classes.headerChat}>
        <div className={classes.userNameHeader}>{userName}</div>
        <a className={classes.buttonSave} onClick={this.clickSaveButton} ref={this.buttonSave} href={avatar}>
          save
        </a>
        <div className={classes.photoUserHeader} style={style} />
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
