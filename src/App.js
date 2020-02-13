import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Auth from './components/Auth';
import Chat from './components/Chat';
import combine from './store/reducers';

const store = createStore(combine, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
