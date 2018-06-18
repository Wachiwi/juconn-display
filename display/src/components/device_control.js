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
          state: {on: value}
        }
      })
  };

  renderCircleColor = () => {

    let h = this.props.device.state.hue / 180 / 360;
    let s = this.props.device.state.saturation/255;
    let v = this.props.device.state.brightness/255;

    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        r = v, g = t, b = p;
        break;
      case 1:
        r = q, g = v, b = p;
        break;
      case 2:
        r = p, g = v, b = t;
        break;
      case 3:
        r = p, g = q, b = v;
        break;
      case 4:
        r = t, g = p, b = v;
        break;
      case 5:
        r = v, g = p, b = q;
        break;
    }
    r=Math.round(r*255)
    g=Math.round(g*255)
    b=Math.round(b*255)

    console.log('FARBÄÄÄÄÄÖÖÖ',`rgb(${r},${g},${b})`)
    return `rgb(${r},${g},${b})`;

  };

  renderLight_rgbw = () => {
    return (
      <div className="actions">
        <div className={['action', this.props.device.state.on ? '' : 'transparent'].join(' ')}>
          <span>{Math.round(this.props.device.state.brightness / 255 * 100)}%</span>
          <div style={{backgroundColor: this.renderCircleColor()}} className={'circle'}/>
        </div>
        <FormControlLabel
          control={<Switch checked={this.props.device.state.on} onChange={this.onToggleDevice}
                           className={'switch primary'}
                           color="primary"/>} label={this.props.device.state.on ? 'ON' : 'OFF'} className="action"/>
      </div>
    );
  };

  renderLight_w = () => {
    return (
      <div className="actions">
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
          this.props.device.model === 'LWB006' &&
          this.renderLight_w()
        }
        {
          this.props.device.model === 'temperatur_controll' &&
          this.renderTemperaturControll()
        }
      </div>
    );
  }
}
