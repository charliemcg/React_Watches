import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Brands extends Component {
  render() {
    return (
      <div>
        <Link to="/rolex">Rolex</Link>
        <Link to="/cartier">Cartier</Link>
      </div>
    );
  }
}
