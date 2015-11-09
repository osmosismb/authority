import React, { Component } from 'react';

import { LoginForm } from '../Forms';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    let form = this.refs.LoginForm;
  }

  render() {
    return (
      <div className="page__home">
        <LoginForm ref="LoginForm" onSubmit={this.onSubmit} />
      </div>
    )
  }
}
