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
        <Link
          to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.AUDEMARS_PIGUET}`}
        >
          {constants.brands.AUDEMARS_PIGUET}
        </Link>
        <Link to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.OMEGA}`}>
          {constants.brands.OMEGA}
        </Link>
        <Link
          to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.VACHERON_CONSTANTIN}`}
        >
          {constants.brands.VACHERON_CONSTANTIN}
        </Link>
        <Link
          to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.CHOPARD}`}
        >
          {constants.brands.CHOPARD}
        </Link>
        <Link
          to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.PANERAI}`}
        >
          {constants.brands.PANERAI}
        </Link>
        <Link
          to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.RICHARD_MILLE}`}
        >
          {constants.brands.RICHARD_MILLE}
        </Link>
      </div>
    );
  }
}
