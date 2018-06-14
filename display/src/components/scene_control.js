import React, {Component} from 'react';
import {FormControlLabel, Switch} from "@material-ui/core";

export default class SceneControl extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.scene;
  }

  onToggle=()=>{
    this.setState({active: !this.state.active});
  };

  render() {
    return (
      <div className={["scene-control", this.state.active?'':'transparent'].join(' ')}>
        <div className="scene-header">
          <span className="scene-title">
            {this.state.name}
          </span>
          <FormControlLabel
            control={<Switch color="primary" checked={this.state.active} onChange={this.onToggle}/>} label={this.state.active?'ON':'OFF'} className="action"/>
        </div>
        <div className="scene-devices">
          {this.state.devices.map(device => {
            return (
              <div key={device.id} className="scene-device">
                <div className={['small', 'circle', device.newState.on? 'yellow':'gray'].join(' ')}/>
                <div className='label'>{device.name}</div>
              </div>
            )
          })}

        </div>
      </div>
    );
  }
}
