import React from 'react';
import './Chat.css';

class Chat extends React.Component {
    constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let userId = localStorage.getItem('userId');
    console.log(userId);
    fetch('http://localhost:4000/api/message', {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({
        "message": this.state.value,
        "user_id": userId
      })
    });
    fetch('http://localhost:4000/api/messages', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(response => response.text())
    .then(result => {
      JSON.parse(result).forEach(obj => {
        
        let div = document.createElement('div');
        if (obj.user_id===userId) {
          div.className = "user-message";
        } else {
          div.className = "just-message";
        }
        div.innerHTML = obj.message;
        document.querySelector('.messages').append(div);
      });
      // console.log(userMessage);
      // filter(obj => obj.user_id===userId).
    });
  }
  
  
    render() {
      return (
        <div className="chat">
          <div className="messages">

          </div>
          <form onSubmit={this.handleSubmit} className="chat-form">
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
  
  export default Chat;