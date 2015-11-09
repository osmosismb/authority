import React, { Component } from 'react';

import { RegisterForm } from '../Forms';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    let form = this.refs.RegisterForm;
  }

  render() {
    return (
      <div className="page__home">
        <div className="page--content">
          <RegisterForm ref="RegisterForm"
            onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}
