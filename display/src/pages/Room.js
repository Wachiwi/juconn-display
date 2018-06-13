import React, {Component} from 'react';
import View from "../components/view";
import DeviceControl from "../components/device_control";

export default class Room extends Component {


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
      },{
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
      },{
        id: '1337',
        name: 'Raum Temperatur',
        description: 'Temperatur im Konferenzraum 5',
        type: 'temperatur_controll',
        state:{
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
      scene:[{
        name:'Meeting Modus',
        active: false,
        devices:[{
          id:'1234',
          name:'Lampe 1',
          type: 'light_rgbw',
          currentState:{
            on: false,
          },
          newState:{
            on:true,
          }
        }, '2009', '1337']
      }]
    }
  }


  render() {
    return (
      <View single={true}>
        <div className='scenes'>

        </div>
        <div className="devices">
          <div className="title">
            Einzelsteuerung
          </div>
          <div className="list">
            {this.state.devices.map(device => {
              return <DeviceControl key={device.id} device={device}/>;
            })}
          </div>
        </div>
      </View>
    );
  }

}
