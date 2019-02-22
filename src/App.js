import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { StateProvider } from './Global/state';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <StateProvider>
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/" className="item">Home</Link>
                {/* <Link to="/log-in">Log In</Link>
                <Link to="/sign-up">Sign Up</Link> */}
                <Link to="/new-character" className="item">Create New Character</Link>
              </Navbar.Brand>
              {/* <Navbar.Toggle /> */}
            </Navbar.Header>
          </Navbar>
          <Routes />
        </StateProvider>
      </div>
    );
  }
}

export default App;