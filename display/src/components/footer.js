import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {withRouter} from "react-router";

import juconn_logo from '../assets/img/juconn.svg';
import hsc_logo from '../assets/img/hsc-logo.png';


class Footer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const {location} = this.props
    return (
      <div className="app-footer">
        <div className="powered-by">
          <img src={juconn_logo} className="logo" alt="logo"/>
          <img src={hsc_logo} className="logo" alt="logo"/>
        </div>
        <div className="actions">
          <Link to='/settings' className={`${location.pathname === '/settings' ? 'active' : ''} action`}>
            <img src={require('../assets/img/icons/settings.svg')} className="action-icon" alt=""/>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer)
