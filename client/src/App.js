import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import LoginForm from './components/loginForm/LoginForm';
import SignupForm from './components/signupForm/SignupForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleGetInfo = this.handleGetInfo.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.handleLogOut();
  }
  handleLogIn(email, password) {
    axios
      .post('/api/login', {
        email: email,
        password: password
      })
      .then(res => {
        console.log(res.data);
        if (res.data) {
          this.setState({ loggedIn: true });
        }
      })
      .catch(err => {
        if (err) console.log('Invalid email or password');
      });
  }

  handleSignUp(email, password) {
    axios
      .post('/api/signup', { email: email, password: password })
      .then(res => {
        if (!res.data.errors) this.setState({ loggedIn: true });
        console.log(res.data.errors);
      })
      .catch(err => console.log(err));
  }

  handleGetInfo() {
    axios
      .get('/api/info')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  handleLogOut() {
    axios
      .get('/logout')
      .then(res => {
        console.log(res.data);
        this.setState({ loggedIn: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? (
          <h1>You are logged in</h1>
        ) : (
          <div>
            <p>Sign In</p>
            <LoginForm handleLogIn={this.handleLogIn} />
            <p>Sign Up</p>
            <SignupForm handleSignUp={this.handleSignUp} />
          </div>
        )}
        {/* <button onClick={this.handleLogIn}>Log In</button>
        <button onClick={this.handleLogOut}>Log Out</button>
        <button onClick={this.handleGetInfo}>Get info</button> */}
      </div>
    );
  }
}

export default App;
