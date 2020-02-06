import React from 'react';
import './App.css';
import Auth from './components/Auth';
import Chat from './components/Chat';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';



class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
          <Route exact path="/" component={() => <Redirect to={{ pathname: '/auth' }} />} />
          <div className="App-content">
            <Route path='/auth' component={Auth}/>
            <Route path='/chat' component={Chat}/>
          </div>
      </BrowserRouter>
    );
  }
}


 

export default App;
