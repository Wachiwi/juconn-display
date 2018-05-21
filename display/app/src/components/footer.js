import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';

import juconn_logo from '../assets/img/juconn.svg';

export default class Footer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app-footer">
        <div className="powered-by">
        <img src={juconn_logo} className="logo" alt="logo"/>
          <span className="desc-text">
          powered by Juconn
          </span>
        </div>
        <div className="actions">
          <div className="action">
            <img src={require('../assets/img/icons/settings.svg')} className="action-icon"/>
          </div>

        </div>
      </div>
    );
  }

}
