import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleGetInfo = this.handleGetInfo.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.handleLogOut();
  }
  handleLogIn() {
    axios
      .post('/api/login', {
        email: 'cab3953@gmail.com',
        password: 'password'
      })
      .then(res => {
        console.log(res.data);
        if (res.data) {
          this.setState({ loggedIn: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
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
          <h1>You are not logged in</h1>
        )}
        <button onClick={this.handleLogIn}>Log In</button>
        <button onClick={this.handleLogOut}>Log Out</button>
        <button onClick={this.handleGetInfo}>Get info</button>
      </div>
    );
  }
}

export default App;
