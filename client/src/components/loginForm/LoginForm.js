import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form action="">
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </form>
        <button
          value="submit"
          onClick={() =>
            this.props.handleLogIn(this.state.email, this.state.password)
          }
        >
          Log In
        </button>
      </div>
    );
  }
}

export default LoginForm;
