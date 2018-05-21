import React, {Component} from 'react';

import Header from "./header";
import Footer from "./footer";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      elements: [{
        icon: "None",
        name: "Test",
        description: "Test123",
        active: true
      }, {
        icon: "None",
        name: "Test",
        description: "Test123",
      }, {
        icon: "None",
        name: "Test",
        description: "Test123",
      }, {
        icon: "None",
        name: "Test",
        description: "Test123",
      }, {
        icon: "None",
        name: "Test",
        description: "Test123",
      }],
    };
  }

  render() {
    return (
      <div className="app">
        <Header/>
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
        <Footer/>
      </div>
    );
  }

}
