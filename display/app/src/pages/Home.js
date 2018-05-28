import React, {Component} from 'react';

import Header from "../components/header";
import Footer from "../components/footer";
import DeviceControl from "../components/device_control";
import SceneControl from "../components/scene_control";
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
  <div className="scenes">
            <SceneControl/>
          </div>
          <div className="devices">
            <div className="title">
              Einzelsteuerung
            </div>
            <div className="list">
              <DeviceControl/>
              <DeviceControl/>
              <DeviceControl/>
            </div>
          </div>
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
