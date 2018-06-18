import React, {Component} from 'react';

const {ipcRenderer} = window.require('electron');

const DevicesContext = React.createContext();


class DevicesProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      devices: [
        /*{
        id: '1234',
        name: 'Lampe 1',
        description: 'LOLULUOLASD',
        type: 'light_rgbw',
        state: {
          on: false,
          brightness: 0.7,
          hue: null,
          saturation: null,
          color_temperature: null,
          effect: null
        }
      }, {
        id: '2009',
        name: 'Lampe Hinten',
        description: 'LOLULUOLASD',
        type: 'light_rgbw',
        state: {
          on: true,
          brightness: 0.3,
          hue: null,
          saturation: null,
          color_temperature: null,
          effect: null
        }
      },*/
      ],
    };

    this.defaultDevice = {
      id: '1337',
      fake: true,
      name: 'Raum Temperatur',
      description: 'Temperatur im Konferenzraum 5',
      model: 'temperatur_controll',
      state: {
        on: false,
        temperature: 20,
        minTemperature: 13,
        maxTemperature: 30,
        unit: {
          name: 'Grad',
          symbol: '°'
        }
      }
    };

    this.actions = {};
  }

  componentWillMount() {
    //Set loading only once
    ipcRenderer.on('mqtt', (event, data) => {
      if (Object.keys(data).length === 0) return;
      let topic = data.topic;
      let message = (typeof data.message === 'object' ? data.message : JSON.parse(data.message));
      console.log('GOT msg:', message);
      if (message.type === 'CFG') this.loadDevices(message);
      if (message.type === 'UPD') this.updateDevices(message);
    });
  }


  loadDevices = (devices) => {
    let d = [];
    for (let i = 0; i < devices.data.length; i++) {
      let id = devices.data[i].id;
      for (let j = 0; j < devices.data[i].data.length; j++) {
        //Add controller_id
        devices.data[i].data[j].controller_id = id;
        d.push(devices.data[i].data[j]);
      }
    }
    d.push(this.defaultDevice);

    this.setState({devices: d});
  };

  updateDevices = (newDevices) => {
    console.log('update Devices called', this.state.devices, newDevices);
    let devices = this.state.devices;
    for (let i = 0; i < devices.length; i++) {
      //go threw each device and look if it needs to be updated
      if (devices[i].controller_id === newDevices.id) {
        //id the controller_id is the same as the controller the data is coming from
        for (let j = 0; j < newDevices.data.length; j++) {
          if (devices[i].id === newDevices.data[j].id) {
            //update the device
            devices[i] = newDevices.data[j];
            devices[i].controller_id = newDevices.id;
          }
        }
      }
    }
    for (let i = 0; i < devices.length; i++) {

    }

    this.setState({devices: devices});
  };

  componentWillUnmount() {
    console.log('STORE IST TOT ICH WIEDERHOLE DER STORE IST TOT *chhh* over')
  };

  render() {
    return (
      <DevicesContext.Provider value={{
        state: this.state,
        action: this.actions
      }}>
        {this.props.children}
      </DevicesContext.Provider>
    )
  }
}

export {
  DevicesProvider,
  DevicesContext
}
