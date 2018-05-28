import React, {Component} from 'react';
import Header from "./header";
import Footer from "./footer";

export default class View extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <div className={`${this.props.single ? 'single': ''} app-body`}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }

}


