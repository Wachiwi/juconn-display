import React, {Component} from 'react';

import logo from './assets/img/logo.png';

import './App.css';

// https://github.com/electron/electron/issues/7300
// We don't want to bundle electron in the webpack process so we use it's globally exposed require method.
// const electron = window.require('electron');

class App extends Component {

  constructor() {
    super();
    this.state = {
      elements: [{
        icon: "None",
        name: "Test",
        description: "Test123",
        info: "i",
        active: true
      }, {
        icon: "None",
        name: "Test",
        description: "Test123",
        info: "i",
      }, {
        icon: "None",
        name: "Test",
        description: "Test123",
        info: "i",
      }, {
        icon: "None",
        name: "Test",
        description: "Test123",
        info: "i",
      }, {
          icon: "None",
          name: "Test",
          description: "Test123",
          info: "i",
        }],
    };
  }

  render() {
    return (
      <div className="app bright-background">
        <div className="app-header dark-background">
          <div>
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <div id="room-breadcrumb" className="has-centered-text">
            <h2>Raum 2-U08</h2>
          </div>
          <div id="additional-options">
            <a href="#">
              <i className='fas fa-2x fa-cogs'/>
            </a>
          </div>
        </div>
        <div className="cards">
          {
            this.state.elements.map((el) => {
              return (
                <div className={`card white-background ${el.active ? 'active' : ''}`}>
                  <div className="icon">
                    {el.active ? (
                      <i className="fas fa-2x fa-lightbulb yellow"/>
                    ) : (
                      <i className="far fa-2x fa-lightbulb"/>
                    )}
                  </div>
                  <div className="info">
                    <i className={`fas fa-2x fa-info-circle ${el.active ? 'yellow' : ''}`}/>
                  </div>
                  <div className="card-header">
                    <div className="card-title">
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
