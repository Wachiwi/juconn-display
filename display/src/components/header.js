import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
    const {location, history} = this.props
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
            <div><b>Standort:</b> Garching</div>
            <div><b>Uhrzeit:</b> 17:26 Uhr</div>
          </div>
        </div>
        <div className="action">
          <FormControlLabel
            control={<Switch checked={false} color="primary"/>} label="OFF"/>
        </div>
      </div>
    );
  }

  roomsTitle() {
    return (
      <Link to='/' className="room-info">
        <div className="action">
          <i className="fas fa-2x fa-chevron-left"></i>
        </div>
        <div className="meta">
          <h1 className="title">Verfügbare Räume</h1>
          <div className="more">
            <div>Wählen Sie einen anzuzeigenden Raum aus.</div>
          </div>
        </div>
      </Link>
    );
  }

  settingsTitle() {
    return (
      <div className="head-line">
        <a className="back" onClick={this.history.goBack}>
          <div className="arrow">
            <img src={require('../assets/img/icons/icon_chevron_left_dark.svg')} className="logo" alt="logo"/>
          </div>
          <div className="description">
            zurück
          </div>
        </a>
        <div className="title">
          Einstellungen
        </div>
      </div>
    );
  }

  statisticTitle() {
    return (
      <div className="head-line">
        <Link className="back" to={'/rooms'}>
          <div className="arrow">
            <img src={require('../assets/img/icons/icon_chevron_left_dark.svg')} className="logo" alt="logo"/>
          </div>
          <div className="description">
            zurück
          </div>
        </Link>
        <div className="title">
          Datenverlauf
        </div>
      </div>
    )
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
    switch (route) {
      case '/':
        return this.homeTitle()
      case '/settings':
        return this.settingsTitle()
      case '/statistic':
        return this.statisticTitle()
      case '/rooms':
        return this.roomsTitle()
      default:
        if (route.match(/\/room\/?/) !== null)
          return this.roomInfo()
    }
  }

  render() {
    const {params} = this.props
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
