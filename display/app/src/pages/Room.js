import React, {Component} from 'react';
import PropTypes from 'prop-types';
import View from "../components/view";

export default class Room extends Component {
  static propTypes = {
    roomID: PropTypes.object.isRequired
  }

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
