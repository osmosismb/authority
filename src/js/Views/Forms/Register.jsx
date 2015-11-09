import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);

    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value
    });
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
      <form className="form--register block width-6 margin-center">
        <div className="form--register__content form__content p-v p-h">
          <h3>Register</h3>
          <Link
            className="form--register__login"
            to="login">
            Already have an account? Login here.
          </Link>
          <input className="form--register__email"
            placeholder="Email"
            type="text"
            onChange={this.onEmailChange} />
          <input className="form--register__username"
            placeholder="Username"
            type="text"
            onChange={this.onUsernameChange} />
          <input className="form--register__password"
            placeholder="Password"
            type="password"
            onChange={this.onPasswordChange} />
        </div>
        <div className="form--register__footer form__footer border-top--grey p-v p-h">
          <button className="form--register__submit"
            name="submit"
            value="submit"
            onClick={this.props.onSubmit}>
            Register
          </button>
        </div>
      </form>
    )
  }
}
