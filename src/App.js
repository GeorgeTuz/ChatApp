import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Auth from './components/Auth';
import Chat from './components/Chat';
import { store } from './store';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Route exact path="/" component={() => <Redirect to={{ pathname: '/auth' }} />} />
          <div className="app-content">
            <Route path="/auth" component={Auth} />
            <Route path="/chat" component={Chat} />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
