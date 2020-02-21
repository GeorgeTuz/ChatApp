import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import MessageUser from '../MessageUser/MessageUser';
import MessageOther from '../MessageOther/MessageOther';
import HeaderChat from '../HeaderChat/HeaderChat';
import InputChat from '../InputChat/InputChat';

const useStyles = () => ({
  messages: {
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
    height: '75vh',
    margin: '0 auto',
    overflow: 'auto',
    backgroundColor: 'rgb(252, 252, 252)',
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.messageBlock = React.createRef();
  }

  componentDidMount() {
    const messagesBlock = this.messageBlock.current;
    const heightMessageBox = messagesBlock.scrollHeight;
    messagesBlock.scrollTo(0, heightMessageBox);
  }

  componentDidUpdate() {
    const messagesBlock = this.messageBlock.current;
    const heightMessageBox = messagesBlock.scrollHeight;
    messagesBlock.scrollTo(0, heightMessageBox);
  }

  handleChange(event) {
    this.props.addNewMessage(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.sendMessages();
  }

  render() {
    const { classes, messages, newMessage } = this.props;
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    console.log('Chat component');

    return (
      <div className="chat">
        <HeaderChat userName={userName} />
        <Box className={classes.messages} ref={this.messageBlock}>
          {messages
            ? messages.map(message => {
                const isUserOwnMessage = message.userId === userId;
                return isUserOwnMessage ? (
                  <MessageUser message={message.message} userName={message.userName} />
                ) : (
                  <MessageOther message={message.message} userName={message.userName} />
                );
              })
            : undefined}
        </Box>
        <InputChat value={newMessage || ''} onChange={this.handleChange} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  newMessage: PropTypes.string.isRequired,
  classes: PropTypes.object,
  addNewMessage: PropTypes.func,
  sendMessages: PropTypes.func,
};

Chat.defaultProps = {
  classes: {},
  addNewMessage: () => {},
  sendMessages: () => {},
};

export default withStyles(useStyles)(Chat);
