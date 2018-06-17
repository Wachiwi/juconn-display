import React, {Component} from 'react';
import {FormControlLabel, Switch} from "@material-ui/core";
import Slider from '@material-ui/lab/Slider';

const {ipcRenderer} = window.require('electron');

export default class DeviceControl extends Component {
  constructor(props) {
    super(props);
    this.device = this.props.device;
  }

  onSliderChange = (event, value) => this.setState({temperature: value});

  onToggleDevice = (e, value) => {
    ipcRenderer.send('publish-mqtt',
      {
        topic: `${this.props.device.controller_id}/`,
        message: {
          id: this.props.device.id,
          type: 'CMD',
          state:{on: value}
        }
      })
  };

  renderLight_rgbw = () => {
    return (
      <div className="actions">
        <div className={['action', this.props.device.state.on ? '' : 'transparent'].join(' ')}>
          <span>{Math.round(this.props.device.state.brightness / 255 * 100)}%</span>
          <div className={'orange circle'}/>
        </div>
        <FormControlLabel
          control={<Switch checked={this.props.device.state.on} onChange={this.onToggleDevice}
                           className={'switch primary'}
                           color="primary"/>} label={this.props.device.state.on ? 'ON' : 'OFF'} className="action"/>
      </div>
    );
  };

  renderTemperaturControll = () => {
    return (
      <React.Fragment>
        <div className='actions'>
          <div className='action'>
            Eingestellte Raumtemperatur {this.props.device.state.temperature} {this.props.device.state.unit.symbol}
          </div>
        </div>
        <div className={'extra slider'}>
          <Slider
            min={this.props.device.state.minTemperature}
            max={this.props.device.state.maxTemperature}
            value={this.props.device.state.temperature}
            onChange={this.onSliderChange}
            step={1}
          />
          <span
            className='label left'>{this.props.device.state.minTemperature} {this.props.device.state.unit.symbol}</span>
          <span
            className='label right'>{this.props.device.state.maxTemperature} {this.props.device.state.unit.symbol}</span>
        </div>
      </React.Fragment>
    )
  };

  render() {
    return (
      <div className="device-control">
        <span className="title">
          {this.props.device.name}
        </span>
        {
          this.props.device.model === 'LCT007' &&
          this.renderLight_rgbw()
        }
        {
          this.props.device.model === 'temperatur_controll' &&
          this.renderTemperaturControll()
        }
      </div>
    );
  }
}
