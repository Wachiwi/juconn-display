import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';

import PropTypes from 'prop-types'
import {withRouter} from "react-router";

import {Switch, FormControlLabel} from "@material-ui/core";

import logo from '../assets/img/logo.svg';

class Header extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }


  constructor(props) {
    super(props);
    const {location, history } = this.props
    this.location = location
    this.history = history

    this.state = {
      brand: (this.props === undefined || this.props.brandImage === undefined ? logo : this.props.brandImage)
    };
  }


  roomInfo(roomId) {
    return (
    <div className="room-info">
      <div className="meta">
        <h1 className="title">Raum 2-U08</h1>
        <div className="more">
          <div><b>Standort:</b> Garchin Lat Long</div>
          <div><b>Uhrzeit:</b> 17:26 Uhr</div>
        </div>
      </div>
      <div className="action">
        <FormControlLabel
          control={<Switch color="primary"/>} label="Off"/>
      </div>
    </div>
    );
  }

  settingsTitle() {
    return (
      <a className="room-info" onClick={this.history.goBack}>
        <div className="action">
          <i className="fas fa-2x fa-chevron-left"></i>
        </div>
        <div className="meta">
          <h1 className="title">Einstellungen</h1>
          <div className="more">
            <div>Nehmen Sie hier Einstellungen für das Display vor.</div>
          </div>
        </div>

      </a>
    );
  }

  homeTitle() {
    return (
      <Link to='/rooms' className="room-info">
        <div className="meta">
          <h1 className="title">Kein Raum ausgewählt</h1>
          <div className="more">
            <div>Bitte hier tippen um einen Raum auszuwählen.</div>
          </div>
        </div>
      </Link>
    );
  }

  headerSwitcher(route, params) {
    if (route === '/') {
      return this.homeTitle()
    } else if (route === '/settings') {
      return this.settingsTitle()
    }
  }

  render() {
    const {params, location} = this.props
    return (
      <div className="app-header">
        {this.headerSwitcher(this.location.pathname, params)}
        <Link to="/" className="brand">
          <img src={this.state.brand} className="logo" alt="logo"/>
        </Link>
      </div>
    );
  }

}

export default withRouter(Header)
