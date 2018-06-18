import React, {Component} from 'react';
import View from "../components/view";
import DeviceControl from "../components/device_control";
import SceneControl from "../components/scene_control";
import {DevicesContext} from '../store/devices'

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
      scenes: [{
        name: 'Meeting Modus',
        id: 9009,
        active: false,
        devices: [{
          id: '1234',
          name: 'Hue color lamp 1',
          type: 'light_rgbw',
          newState: {
            on: true,
            brightness: 0.3,
            hue: null,
            saturation: null,
            color_temperature: null,
            effect: null
          }
        }, {
          id: '2009',
          name: 'Hue white lamp 1',
          type: 'light_rgbw',
          newState: {
            on: false,
          }
        }]
      }]
    }
  }


  render() {
    return (
      <DevicesContext.Consumer>
        {(context) =>
          <View >
            <div className='scenes'>
              <div>
                Modi
              </div>
              <div className='list'>
                {this.state.scenes.map(scene => {
                  return <SceneControl key={scene.id} scene={scene}/>;
                })}
              </div>
            </div>
            <div className="devices">
              <div className="title">
                Einzelsteuerung
              </div>
              <div className="list">
                {context.state.devices !== null && context.state.devices.map((device) => {
                  return <DeviceControl key={device.id} device={device} />;
                })}
              </div>
            </div>
          </View>
        }
      </DevicesContext.Consumer>
    );
  }

}
