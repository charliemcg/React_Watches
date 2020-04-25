import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import strings from "./strings";

export default class SignUpSuccess extends Component {
  render() {
    return (
      <div>
        <h3 style={{ color: "pink" }}>Welcome to this app!</h3>
        <p style={{ color: "pink" }}>You can now sign in.</p>
        <Link to={constants.SIGN_IN}>{strings.signIn}</Link>
      </div>
    );
  }
}
