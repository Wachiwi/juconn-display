import React, {Component} from 'react';
import {FormControlLabel, Switch} from "@material-ui/core";
import Slider from '@material-ui/lab/Slider';

export default class DeviceControl extends Component {
  constructor(props) {
    super(props);
    this.device = this.props.device;
    this.state = this.device.state
  }

  onToggleDevice = () => {
    this.setState({on: !this.state.on});
  };

  onSliderChange = (event, value) => this.setState({temperature: value});


  renderLight_rgbw = () => {
    return (
      <div className="actions">
        <div className={['action', this.state.on? '':'transparent'].join(' ')}>
          <span>{this.state.brightness * 100}%</span>
          <div className={'orange circle'}/>
        </div>
        <FormControlLabel
          control={<Switch checked={this.state.on} onChange={this.onToggleDevice} className={'switch primary'}
                           color="primary"/>} label={this.state.on ? 'On' : 'Off'} className="action"/>
      </div>
    )
  };

  renderTemperaturControll = () => {
    return (
      <React.Fragment>
        <div className='actions'>
          <div className='action'>
            Eingestellte Raumtemperatur {this.state.temperature} {this.state.unit.symbol}
          </div>
        </div>
        <div className={'extra slider'}>
          <Slider
            min={this.state.minTemperature}
            max={this.state.maxTemperature}
            value={this.state.temperature}
            onChange={this.onSliderChange}
            step={1}
          />
          <span className='label left'>{this.state.minTemperature} {this.state.unit.symbol}</span>
          <span className='label right'>{this.state.maxTemperature} {this.state.unit.symbol}</span>
        </div>
      </React.Fragment>


    )
  };


  render() {
    return (
      <div className="device-control">
        <span className="title">
          {this.device.name}
        </span>
        {
          this.device.type === 'light_rgbw' &&
          this.renderLight_rgbw()
        }
        {
          this.device.type === 'temperatur_controll' &&
          this.renderTemperaturControll()
        }
      </div>
    );
  }
}
