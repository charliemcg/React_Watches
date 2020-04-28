import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";

export default class UnderConstruction extends Component {
  render() {
    return (
      <div>
        <h1>Under Construction...</h1>
        <Link to={`${constants.routes.HOME}`}>Go Back</Link>
      </div>
    );
  }
}
