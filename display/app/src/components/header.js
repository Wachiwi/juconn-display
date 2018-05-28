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


  constructor() {
    super();

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
      <Link to='/' className="room-info">
        <h1 className="title"><i className="fas fa-chevron-left"></i>&nbsp;Einstellungen</h1>
      </Link>
    );
  }

  homeTitle() {
    return (
      <div className="room-info">
      </div>
    );
  }

  headerSwitcher(route) {
    if (route === '/') {
      return this.homeTitle()
    } else if (route === '/settings') {
      return this.settingsTitle()
    }
  }

  render() {
    const { router, params, location, routes } = this.props
    return (
      <div className="app-header">
        {this.headerSwitcher(location.pathname)}
        <Link to="/" className="brand">
          <img src={this.state.brand} className="logo" alt="logo"/>
        </Link>
      </div>
    );
  }

}

export default withRouter(Header)
