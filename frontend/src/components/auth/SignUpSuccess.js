import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SignUpSuccess extends Component {
  render() {
    return (
      <div>
        <h3>Welcome to this app!</h3>
        <p>You can now sign in.</p>
        <Link to="/signIn">Sign in</Link>
      </div>
    );
  }
}
