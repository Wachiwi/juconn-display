import React, {Component} from 'react';
import View from "../components/view";
import DeviceControl from "../components/device_control";

export default class Room extends Component {


  constructor(props) {
    super(props)

    this.state = {
      devices: [{
        id: '',
        name: 'Lampe 1',
        description: 'LOLULUOLASD',
        type: 'light_light',
        state: {
          on: false,
          brightness: 0.7
        }
      }]
    }
  }


  render() {
    return (
      <View single={true}>
        <div className="devices">
          <div className="title">
            Einzelsteuerung
          </div>
          <div className="list">
            {this.state.devices.map(device => {
              return <DeviceControl device={device}/>;
            })}

          </div>
        </div>
      </View>
    );
  }

}
