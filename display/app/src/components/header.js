import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import {Switch, FormControlLabel} from "@material-ui/core";

import logo from '../assets/img/logo.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      brand: (this.props === undefined || this.props.brandImage === undefined ? logo : this.props.brandImage)
    };
  }

  render() {
    return (
      <div className="app-header">
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
        <Link to="/" className="brand">
          <img src={this.state.brand} className="logo" alt="logo"/>
        </Link>
      </div>
    );
  }

}

export default Header;
