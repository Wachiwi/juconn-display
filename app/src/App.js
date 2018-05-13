import React, { Component } from 'react';

import logo from './logo.png';
import lampActive from './assets/LightbulbOn.svg'
import lampInactive from './assets/LightbulbOff.svg'
import infoActive from './assets/infoActive.svg'
import infoInactive from './assets/infoInactive.svg'

import './App.css';

// https://github.com/electron/electron/issues/7300
// We don't want to bundle electron in the webpack process so we use it's globally exposed require method.
const electron = window.require('electron');
const fs = electron.remote.require('fs');
var files = fs.readdirSync('./');

class App extends Component {

  constructor() {
    super();
    this.state = {
      elements: [{
        icon: "None",
        name: "Test",
        description:"Test123",
        info:"i",
        active: true
      }, {
        icon: "None",
        name: "Test",
        description:"Test123",
        info:"i",
      }],
    };
  }

  render() {
    return (
      <div className="app bright-background">
        <div className="app-header dark-background">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="headline">
            <h2>Raum 2-U08</h2>
          </div>
          <i className="fa fa-heart"></i>
        </div>
        <div className="cards">
                    {
            this.state.elements.map((el) => {
              return (
                <div className={`card white-background ${el.active ? 'active' : ''}`}>
                  <div className="icon">
                    <img src={el.active? lampActive : lampInactive} />
                  </div>
                  <div className="info">
                    <img src={el.active? infoActive : infoInactive} />{el.info}
                  </div>
                  <div className="card-header">
                    <div class="card-title">
                      {el.name}
                    </div>
                    <div className="card-subtitle">
                      {el.description}
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
