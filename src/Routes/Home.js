import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Pathfinder Web App</h1>
          <p>An app for the Pathfinder RPG</p>
        </div>
      </div>
    );
  }
}