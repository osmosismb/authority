import React from 'react';
import superagent from 'superagent';

import RegisterForm from '../Forms/Register';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    let form = this.refs.RegisterForm;
    superagent.post('/register')
      .send({
        username: form.state.username,
        password: form.state.password,
        email: form.state.email
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (!res.ok) {
          console.log(err);
          return;
        }

        console.log(JSON.stringify(res.body));
      });
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
