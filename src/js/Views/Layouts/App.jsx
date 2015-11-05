import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="app">
        <h1>Osmosis Authority!</h1>
      </div>
    )
  }
}
