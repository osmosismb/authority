import React, { Component } from 'react';
import { RouteHandler } from 'react-router';
import Router from '../../Router';

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <RouteHandler/>;
  }
}
