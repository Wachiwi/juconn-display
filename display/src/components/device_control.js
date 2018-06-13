import React, {Component} from 'react';
import {FormControlLabel, Switch} from "@material-ui/core";

export default class DeviceControl extends Component {
  constructor(props) {
    super(props);
    this.device = this.props.device;
  }

  render() {
    return (
      <div className="device-control">
        <span className="title">
          {this.device.name}
        </span>
        <div className="actions">
          <FormControlLabel
            control={<Switch color="primary"/>} label="Off" className="action"/>
          <FormControlLabel
            control={<Switch checked={this.device.state.on} color="primary"/>} label={this.device.state.on?'On':'Off'} className="action"/>
        </div>
      </div>
    );
  }
}
