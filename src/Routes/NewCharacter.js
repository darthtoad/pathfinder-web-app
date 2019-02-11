import React, { Component } from "react";
import "./NewCharacter.css";

export default class NewCharacter extends Component {
    state = {
        name: ''
    }

    // constructor(props) {
    //     super(props);
    //     this.handleNameChange = this.handleNameChange.bind(this);
    // }

    // handleNameChange(event) {
    //     this.setState({ name: event.target.value })
    // }

  render() {
    return (
        <div>
            <h1>Create New Character</h1>
        </div>
    );
  }
}