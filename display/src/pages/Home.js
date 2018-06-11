import React, {Component} from 'react';

import View from "../components/view";

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

  /*
y
   */

  render() {
    return (
      <View single={true}>
          <div className="centered-container">
            <p className="has-centered-text">
              Bitte nehmen Sie eine Konfiguration unter <b>„Einstellungen“</b> vor
            </p>
          </div>
      </View>
    );
  }

}
