import React, {Component} from 'react';
import View from "../components/view";
import DeviceControl from "../components/device_control";
import SceneControl from "../components/scene_control";
import {DevicesContext} from '../store/devices'

export default class Room extends Component {


  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <View single={true}>
          <img width={577} height={290} src={require('../assets/img/fake_statistic.png')}/>
      </View>
    );
  }

}
