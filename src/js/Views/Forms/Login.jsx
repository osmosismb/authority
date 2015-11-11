import React from 'react';
import { Link } from 'react-router';

export default class LoginForm extends React.Component {
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
      <form className="frm--login block width-6 m-c">
        <div className="frm--login__ctnt frm__ctnt p-v p-h">
          <h3>Please login.</h3>
          <Link to="home">Don't have an account? Register here.</Link>
          <input className="frm--login__username"
            placeholder="Username"
            type="text"
            onChange={this.onUsernameChange} />
          <input className="frm--login__password"
            placeholder="Password"
            type="password"
            onChange={this.onPasswordChange} />
        </div>
        <div className="frm--login__foot frm__foot b-t--grey p-v p-h">
          <button className="frm--login__submit frm__submit"
            name="submit"
            value="submit"
            onClick={this.props.onSubmit}>
            Login
          </button>
        </div>
      </form>
    );
  }
}
