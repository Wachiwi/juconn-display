import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import PropTypes from 'prop-types'
import {withRouter} from "react-router";

import juconn_logo from '../assets/img/juconn.svg';

class Footer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { router, params, location, routes } = this.props
    return (
      <div className="app-footer">
        <div className="powered-by">
        <img src={juconn_logo} className="logo" alt="logo"/>
          <span className="desc-text">
          powered by Juconn
          </span>
        </div>
        <div className="actions">
          <Link to='/settings' className={`${location.pathname === '/settings' ? 'active' : ''} action`}>
            <img src={require('../assets/img/icons/settings.svg')} className="action-icon"/>
          </Link>
        </div>
      </div>
    );
  }
}
export default withRouter(Footer)
