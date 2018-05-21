import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';

import './App.css';
import Settings from "./components/Settings";
import Rooms from "./components/Rooms";
import Home from "./components/Home";

// https://github.com/electron/electron/issues/7300
// We don't want to bundle electron in the webpack process so we use it's globally exposed require method.
// const electron = window.require('electron');

class App extends Component {

  render() {
    return (
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/rooms" component={Rooms}/>
      </Switch>
    );
  }
}

export default App;
