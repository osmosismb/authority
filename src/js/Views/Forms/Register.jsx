import React, { Component } from 'react';

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
      <form className="form--register">
        <div className="form--register__content form__content">
          <h3>Register</h3>
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
        <div className="form--register__footer form__footer">
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
