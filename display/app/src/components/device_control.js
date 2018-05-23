import React, {Component} from 'react';
import {FormControlLabel, Switch} from "@material-ui/core";

export default class DeviceControl extends Component {
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
      <div className="device-control">
        <span className="title">
          Lampe Vorne
        </span>
        <div className="actions">
          <FormControlLabel
            control={<Switch color="primary"/>} label="Off" className="action"/>
          <FormControlLabel
            control={<Switch color="primary"/>} label="Off" className="action"/>
        </div>
      </div>
    );
  }
}
