import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <form className="form--login block width-6 margin-center">
        <div className="form--login__content form__content p-v p-h">
          <h3>Please login.</h3>
          <Link to="root">Don't have an account? Register here.</Link>
          <input className="form--login__username"
            placeholder="Username"
            type="text"
            onChange={this.onUsernameChange} />
          <input className="form--login__password"
            placeholder="Password"
            type="password"
            onChange={this.onPasswordChange} />
        </div>
        <div className="form--login__footer form__footer border-top--grey p-v p-h">
          <button className="form--login__submit form__submit"
            name="submit"
            value="submit"
            onClick={this.props.onSubmit}>
            Login
          </button>
        </div>
      </form>
    )
  }
}
