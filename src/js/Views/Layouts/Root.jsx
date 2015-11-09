import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import { Header } from '../Components';

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <div className="page">
          <RouteHandler/>
        </div>
      </div>
    );
  }
}
