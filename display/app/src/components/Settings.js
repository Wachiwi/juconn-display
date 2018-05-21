import React, {Component} from 'react';
import Header from "./header";

import {Card} from "@material-ui/core";


export default class Settings extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div>
          <Card raised={true}>
            HELLO
          </Card>
        </div>
      </div>
    );
  }

}
