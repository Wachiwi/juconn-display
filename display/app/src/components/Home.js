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
        <div className="app-body">
          <div className="scenes">

          </div>
          <div className="devices">


          </div>
        </div>
        <Footer/>
      </div>
    );
  }

}
