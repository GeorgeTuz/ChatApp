import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import MessageUser from './MessageUser';
import MessageOther from './MessageOther';
import HeaderChat from './HeaderChat';
import InputChat from './InputChat';
import BackendServices from '../BackendServices/backendServices';
import { addMessages, addNewMessage } from '../store/actions/actions';

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

  async componentDidMount() {
    const messages = await BackendServices.getMessages();
    this.props.addMessages(messages);
    const messagesBlock = this.messageBlock.current;
    const heightMessageBox = messagesBlock.scrollHeight;
    messagesBlock.scrollTo(0, heightMessageBox);
  }

  handleChange(event) {
    this.props.addNewMessage(event.target.value);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    console.log(userName);
    BackendServices.postMessage(this.props.state.reducerChat.newMessage, userId, userName);
    const messages = await BackendServices.getMessages();
    this.props.addMessages(messages);
    const messagesBlock = this.messageBlock.current;
    const heightMessageBox = messagesBlock.scrollHeight;
    messagesBlock.scrollTo(0, heightMessageBox);
    this.props.addNewMessage('');
  }

  render() {
    const { classes, state } = this.props;
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    return (
      <div className="chat">
        <HeaderChat userName={userName} />
        <Box className={classes.messages} ref={this.messageBlock}>
          {state.reducerChat.messages
            ? state.reducerChat.messages.map(message => {
                const isUserOwnMessage = message.userId === userId;
                return isUserOwnMessage ? (
                  <MessageUser message={message.message} userName={message.userName} />
                ) : (
                  <MessageOther message={message.message} userName={message.userName} />
                );
              })
            : undefined}
        </Box>
        <InputChat
          value={state.reducerChat.newMessage !== undefined ? state.reducerChat.newMessage : undefined}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addMessages: messages => dispatch(addMessages(messages)),
  addNewMessage: newMessage => dispatch(addNewMessage(newMessage)),
});

Chat.propTypes = {
  state: PropTypes.object,
  classes: PropTypes.object,
  addNewMessage: PropTypes.func,
  addMessages: PropTypes.func,
};

Chat.defaultProps = {
  state: {},
  classes: {},
  addNewMessage: () => {},
  addMessages: () => {},
};

export default withStyles(useStyles)(connect(state => ({ state }), mapDispatchToProps)(Chat));
