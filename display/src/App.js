import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import './App.css';
import Settings from "./pages/Settings";
import Rooms from "./pages/Rooms";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Statistic from "./pages/Statistic"
import {DevicesProvider} from './store/devices'

const {ipcRenderer} = window.require('electron');



// https://github.com/electron/electron/issues/7300
// We don't want to bundle electron in the webpack process so we use it's globally exposed require method.
// const electron = window.require('electron');


class App extends Component {

  constructor() {
    super();
  }


  componentDidMount(){
    console.log('Sending ready state to main process');
    ipcRenderer.send('ready-state');
  }

  render() {
    return (
      <DevicesProvider>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/statistic" component={Statistic}/>
          <Route exact path="/rooms" component={Rooms}/>
          <Route path="/rooms/:roomID" component={Room}/>
        </Switch>
      </DevicesProvider>
    );
  }
}

export default App;
