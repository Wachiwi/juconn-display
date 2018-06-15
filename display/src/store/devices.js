import React, {Component} from 'react';

const {ipcRenderer} = window.require('electron');

const DevicesContext = React.createContext();


class DevicesProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      devices: [{
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
      }, {
        id: '1337',
        name: 'Raum Temperatur',
        description: 'Temperatur im Konferenzraum 5',
        type: 'temperatur_controll',
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
      }
      ],

    };
    this.actions = {
      trigger: this.trigger
    };

    console.log('HUUUUULLLUUU GOT CAAALLLEEED!!!')
  }

  componentWillMount() {
    //Set loading only once
    console.log('Store is mounted!!!!!!!!')
    ipcRenderer.on('mqtt', function (event, data) {
      console.log('INCOMEING MSG', data.topic, data.message)
    });
  }

  componentWillUnmount() {
    console.log('STORE IS TOT ICH WIEDERHOLE DER STORE IST TOT')
  }

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
