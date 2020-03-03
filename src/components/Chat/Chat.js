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
      editMessage: '',
      idMessage: '',
    };

    this.messageBlock = React.createRef();
  }

  componentDidMount() {
    const messagesBlock = this.messageBlock.current;
    const heightMessageBox = messagesBlock.scrollHeight;
    messagesBlock.scrollTo(0, heightMessageBox);
  }

  componentDidUpdate(prevProps, prevState) {
    const messagesBlock = this.messageBlock.current;
    const heightMessageBox = messagesBlock.scrollHeight;
    messagesBlock.scrollTo(0, heightMessageBox);
    if (prevState.editMessage !== this.state.editMessage && this.state.editMessage) {
      this.setState({ newMessage: this.state.editMessage, isEdit: true });
    }
  }

  updateData = (editMessage, idMessage) => {
    this.setState({ editMessage, idMessage });
  };

  handleChange = event => {
    this.setState({ newMessage: event.target.value, isValid: true });
  };

  handleSubmit = event => {
    let { newMessage, isEdit, idMessage } = this.state;
    event.preventDefault();
    newMessage = newMessage.replace(/^\s*/, '').replace(/\s*$/, '');
    if (newMessage) {
      if (isEdit) {
        this.props.editMessage(newMessage, idMessage);
        this.setState({ newMessage: '', isEdit: false, editMessage: '' });
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
                  updateData={this.updateData}
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
  classes: PropTypes.object,
  sendMessages: PropTypes.func,
  editMessage: PropTypes.func,
};

Chat.defaultProps = {
  classes: {},
  sendMessages: () => {},
  editMessage: () => {},
};

export default withStyles(useStyles)(Chat);
