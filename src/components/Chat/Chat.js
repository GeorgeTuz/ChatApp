import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import MessageUser from "../MessageUser/MessageUser";
import MessageOther from "../MessageOther/MessageOther";
import HeaderChat from "../HeaderChat/HeaderChat";
import InputChat from "../InputChat/InputChat";

const useStyles = () => ({
  chat: {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
  },
  messages: {
    display: "flex",
    flexDirection: "column",
    width: "700px",
    flex: "1",
    margin: "0 auto",
    overflow: "auto",
    backgroundColor: "rgb(252, 252, 252)"
  }
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      inputBg: "#f5f5f5"
    };

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

  handleChange = event => {
    this.setState({ newMessage: event.target.value });
    this.setState({ inputBg: "#f5f5f5" });
  };

  handleSubmit = event => {
    let { newMessage } = this.state;
    event.preventDefault();
    newMessage = newMessage.replace(/^\s*/,'').replace(/\s*$/,'');
    if (newMessage) {
      this.props.sendMessages(newMessage);
      this.setState({ newMessage: "" });
    } else {
      this.setState({ inputBg: "red" });
    }
  };

  render() {
    const { classes, messages } = this.props;
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    return (
      <div className={classes.chat}>
        <HeaderChat userName={userName} />
        <Box className={classes.messages} ref={this.messageBlock}>
          {messages &&
            messages.map((message, index) => {
              const isUserOwnMessage = message.userId === userId;
              return isUserOwnMessage ? (
                <MessageUser
                  key={index.toString()}
                  message={message.message}
                  userName={message.userName}
                />
              ) : (
                <MessageOther
                  key={index.toString()}
                  message={message.message}
                  userName={message.userName}
                />
              );
            })}
        </Box>
        <InputChat
          value={this.state.newMessage}
          inputBg={this.state.inputBg}
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
  sendMessages: PropTypes.func
};

Chat.defaultProps = {
  classes: {},
  sendMessages: () => {}
};

export default withStyles(useStyles)(Chat);
