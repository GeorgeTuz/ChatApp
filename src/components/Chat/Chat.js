import React from 'react';
import './Chat.css';
let userId = localStorage.getItem('userId');
let userName = localStorage.getItem('userName');

class Chat extends React.Component {
    constructor(props) {
    super(props);
    this.state = {newMessage: '', messages:[]};


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch('http://localhost:4000/api/messages', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(response => response.text())
    .then(messages => {
      messages = JSON.parse(messages)
      this.setState({messages})
    })
  }

  handleChange(event) {
    this.setState({newMessage: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    await fetch('http://localhost:4000/api/message', {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({
        "message": this.state.newMessage,
        "userId": userId,
        "userName": userName
      })
    });
    await fetch('http://localhost:4000/api/messages', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(response => response.text())
    .then(messages => {
      messages = JSON.parse(messages)
      this.setState({messages})
    })
    this.setState({ newMessage: '' })
  }
  
    render() {
      
      return (
        <div className="chat">
          <div className="messages">
          {this.state.messages.map(message => {
            return (message.userId === userId) ? <div className="user-message">{message.message}</div> :
              <div className="just-message">{message.message}</div>
          
          })}

          </div>
          <form onSubmit={this.handleSubmit} className="chat-form">
            <input type="text" value={this.state.newMessage} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
  
  export default Chat;