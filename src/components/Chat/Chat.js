import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import MessageUser from '../MessageUser';
import MessageOther from '../MessageOther';
import HeaderChat from '../HeaderChat';
import InputChat from '../InputChat';

const useStyles = () => ({
  chat: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
    flex: '1',
    margin: '0 auto',
    overflow: 'auto',
    backgroundColor: 'rgb(252, 252, 252)',
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
      isValid: true,
      isEdit: false,
    };

    this.messageBlock = React.createRef();
  }

  componentDidMount() {
    const messagesBlock = this.messageBlock.current;
    const heightMessageBox = messagesBlock.scrollHeight;
    messagesBlock.scrollTo(0, heightMessageBox);
  }

  componentDidUpdate(prev) {
    const messagesBlock = this.messageBlock.current;
    const heightMessageBox = messagesBlock.scrollHeight;
    messagesBlock.scrollTo(0, heightMessageBox);
    if (prev.editMessage !== this.props.editMessage) {
      this.setState({ newMessage: this.props.editMessage, isEdit: true });
    }
  }

  handleChange = event => {
    this.setState({ newMessage: event.target.value, isValid: true });
  };

  handleSubmit = event => {
    let { newMessage, isEdit } = this.state;
    event.preventDefault();
    newMessage = newMessage.replace(/^\s*/, '').replace(/\s*$/, '');
    if (newMessage) {
      if (isEdit) {
        console.log('EDIT');
        this.props.editMessageFunc(newMessage);
        this.props.editMessageDis('');
        this.setState({ newMessage: '', isEdit: false });
      } else {
        this.props.sendMessages(newMessage);
        this.setState({ newMessage: '', isEdit: false });
      }
      this.setState({ isEdit: false });
    } else {
      this.setState({ isValid: false });
    }
  };

  render() {
    const { classes, messages } = this.props;
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    return (
      <div className={classes.chat}>
        <HeaderChat userName={userName} />
        <Box className={classes.messages} ref={this.messageBlock}>
          {messages &&
            messages.map(message => {
              const isUserOwnMessage = message.userId === userId;
              return isUserOwnMessage ? (
                <MessageUser
                  key={message.id}
                  message={message.message}
                  userName={message.userName}
                  idMessage={message.id}
                />
              ) : (
                <MessageOther key={message.id} message={message.message} userName={message.userName} />
              );
            })}
        </Box>
        <InputChat
          value={this.state.newMessage}
          isValid={this.state.isValid}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  editMessage: PropTypes.string,
  classes: PropTypes.object,
  sendMessages: PropTypes.func,
  editMessageFunc: PropTypes.func,
  editMessageDis: PropTypes.func,
};

Chat.defaultProps = {
  classes: {},
  editMessage: '',
  sendMessages: () => {},
  editMessageFunc: () => {},
  editMessageDis: () => {},
};

export default withStyles(useStyles)(Chat);
