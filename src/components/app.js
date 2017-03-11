import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
      <h1>旅遊小幫手</h1>
      <div>{this.props.children}</div>
      </div>
    );
  }
}
