import React from 'react';
import './Chat.css';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

let userId = localStorage.getItem('userId');
let userName = localStorage.getItem('userName');

class Chat extends React.Component {
    constructor(props) {
    super(props);
    this.state = {newMessage: '', messages:[], buttomMessage: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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
    let arrMassege = document.querySelectorAll('.mess');
    arrMassege[arrMassege.length-1].scrollIntoView({block: 'end', behavior: 'smooth'});
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
    let arrMassege = document.querySelectorAll('.mess');
    arrMassege[arrMassege.length-1].scrollIntoView({block: 'end', behavior: 'smooth'});
    this.setState({ newMessage: '' })
  }

    
  
    render() {

      return (
        <div className="chat">
          <Box className='messages'>
            {this.state.messages.map(message => {
              const isUserOwnMessage = message.userId === userId;
              return isUserOwnMessage ? <div className="user-message mess">{message.message}</div> :
                <div className="just-message mess">{message.message}</div>
            })}
          </Box>
          
          


          
            <div className="form-chat">
              <button className="chat-button"></button>
              <form onSubmit={this.handleSubmit} className="chat-form">
                <input className="form-input" type="text" value={this.state.newMessage} onChange={this.handleChange}  placeholder="Chat something..."/>
              </form>
            </div>
          
          
        </div>
      );
    }
  }
  
  export default Chat;