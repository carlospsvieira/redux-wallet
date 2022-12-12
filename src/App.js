import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => (<Login { ...props } />) } />
        <Route exact path="/wallet" render={ (props) => (<Wallet { ...props } />) } />
      </Switch>
    );
  }
}

export default App;
