import React, { Component } from 'react';
import Header from './Header';
export default class UserPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>{this.props.children}</div>
      </div>
    );
  }
}
