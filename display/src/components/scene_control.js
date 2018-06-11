import React, {Component} from 'react';
import {FormControlLabel, Switch} from "@material-ui/core";

export default class SceneControl extends Component {
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
      <div className="scene-control">
        <div className="scene-header">
          <span className="scene-title">
            Lampe Vorne
          </span>
          <FormControlLabel
            control={<Switch color="primary"/>} label="Off" className="action"/>
        </div>
        <div className="scene-devices">
          <div className="scene-device">
            <span className="yellow circle">&nbsp;</span>
            Label
          </div>
          <FormControlLabel
            control={<Switch color="primary"/>} label="Off" className="action"/>
          <FormControlLabel
            control={<Switch color="primary"/>} label="Off" className="action"/>
        </div>
      </div>
    );
  }
}
