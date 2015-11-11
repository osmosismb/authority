import React from 'react';
import { Link } from 'react-router';

export default class RegisterForm extends React.Component {
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
      <form className="frm--reg block width-6 m-c">
        <div className="frm--reg__ctnt frm__ctnt p-v p-h">
          <h3>Register</h3>
          <Link
            className="frm--reg__login"
            to="login">
            Already have an account? Login here.
          </Link>
          <input className="frm--reg__email"
            placeholder="Email"
            type="text"
            onChange={this.onEmailChange} />
          <input className="frm--reg__username"
            placeholder="Username"
            type="text"
            onChange={this.onUsernameChange} />
          <input className="frm--reg__password"
            placeholder="Password"
            type="password"
            onChange={this.onPasswordChange} />
        </div>
        <div className="frm--reg__foot frm__foot b-t--grey p-v p-h">
          <button className="frm--reg__submit"
            name="submit"
            value="submit"
            onClick={this.props.onSubmit}>
            Register
          </button>
        </div>
      </form>
    );
  }
}
