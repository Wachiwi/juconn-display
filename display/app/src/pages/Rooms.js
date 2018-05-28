import React, {Component} from 'react';

import View from "../components/view";

export default class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      rooms: []
    }
  }

  render() {
    return (
      <View single={true}>
        <div className="centered-container">
          <p className="has-centered-text">
            Keine Räume vorhanden.
          </p>
        </div>
      </View>
    );
  }

}
