import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";

export default class Brands extends Component {
  render() {
    return (
      <div>
        <Link to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.ROLEX}`}>
          {constants.brands.ROLEX}
        </Link>
        <Link
          to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.CARTIER}`}
        >
          {constants.brands.CARTIER}
        </Link>
        <Link
          to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.BREGUET}`}
        >
          {constants.brands.BREGUET}
        </Link>
        <Link
          to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.PATEK_PHILIPPE}`}
        >
          {constants.brands.PATEK_PHILIPPE}
        </Link>
      </div>
    );
  }
}
