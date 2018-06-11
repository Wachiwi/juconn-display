import React, {Component} from 'react';

import View from "../components/view";
import {Link} from "react-router-dom";

var moment = require('moment');
moment.locale('de')

export default class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      rooms: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({rooms: [{
          id: 'f5940efe-9967-471e-9b5d-8b06e9b3d71b',
          name: 'Konferenzraum Dubai',
          location: 'Garching Süd',
          last_seen: new Date().getTime() - 300
      }]}
    )}, Math.random() * (2000 - 750) + 750)
  }

  render() {
    return (
      <View single={true}>
        <div id='rooms' className={`${this.state.rooms.length === 0 ? 'centered-container' : ''}`}>

            {this.state.rooms.length === 0 ? (
              <p className="has-centered-text">
                <i className="fas fa-lg fa-circle-notch fa-spin"></i>
              </p>
            ) :
              this.state.rooms.map((room) => {
              return (
                <Link to={`/rooms/${room.id}`} className='room' key={room.id}>
                  <div className="meta">
                    <h1 className="title">{room.name}</h1>
                    <div className="more">
                      <div><b>Standort:</b> {room.location}</div>
                    </div>
                  </div>
                  <div className='last-seen'>
                    {moment(room.last_seen).fromNow()}
                  </div>
                </Link>
              )
            })

            }

        </div>
      </View>
    );
  }

}
