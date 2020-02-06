import React from 'react';
import './Auth.css';
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';


class Auth extends React.Component {
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
    fetch('http://localhost:4000/api/user', {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({
        "name": this.state.value,
        "avatar": "IMAGE"
      })
    });
    
    fetch('http://localhost:4000/api/users', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(response => response.text())
    .then(result => {
        localStorage.setItem('userId', JSON.parse(result)[JSON.parse(result).length-1].id);
        console.log(JSON.parse(result)[JSON.parse(result).length-1].id);
    });

    this.setState({ redirect: "/chat" });
  }

  state = { redirect: null };

  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }  
    return (
      <div className="Auth">
        <Grid container component="main" className="root">
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className="image" />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className="paper">
              <Avatar >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className="form" noValidate onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  autoFocus 
                  value={this.state.value} 
                  onChange={this.handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                >
                  Sign In
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Please, input your name: 
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Log in" />
        </form> */}
      </div>
    );
  }
}

export default Auth;


