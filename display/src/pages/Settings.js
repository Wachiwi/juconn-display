import React, {Component} from 'react';

import View from "../components/view";

const {ipcRenderer} = window.require('electron');

const WAIT_INTERVAL = 500

export default class Settings extends Component {


  constructor(props) {
    super(props)

    this.state = {
      typing: false,
      fields: {}
    }
  }

  saveFields = () => {
    if(!this.state.typing) {
      console.log(ipcRenderer.sendSync('save-settings-for', this.state.fields))
    } else {
      clearTimeout()
      setTimeout(this.saveFields, WAIT_INTERVAL)
    }
  };

  handleOnChange = (event) => {
    this.setState({typing: true})
    //setTimeout(() => {this.setState({typing: false})}, WAIT_INTERVAL-50)
    //setTimeout(this.saveFields, WAIT_INTERVAL)

    this.setState({fields: Object.assign(this.state.fields,  {[event.target.name]: event.target.value})})

    console.log(event.target.name, event.target.value)

    // this.setState({[event.target.name]: event.target.value});
  };

  render() {
    return (
      <View single={true}>
        <div id="settings" className="centered-container">
          <h1>Gateway</h1>
          <div className="input">
            <label className="required">gateway id</label>
            <input type="text" name="gateway_ip" placeholder="127.0.0.1" onChange={this.handleOnChange}/>
          </div>

          <div id="mandatory-hint">* Pflichtfeld</div>
        </div>
      </View>
    );
  }

}
