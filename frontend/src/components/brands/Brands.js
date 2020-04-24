import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";

export default class Brands extends Component {
  render() {
    return (
      <div>
        <Link to="/dynamicBrand/Rolex">Rolex</Link>
        <Link to="/dynamicBrand/Cartier">Cartier</Link>
        <Link to="/dynamicBrand/Breguet">Breguet</Link>
        <Link to="/dynamicBrand/Patek Philippe">Patek Philippe</Link>
      </div>
    );
  }
}
