import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import strings from "./strings";

class Landing extends Component {
  render() {
    return (
      <div>
        <Link to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.ROLEX}`}>
          {constants.brands.ROLEX}
        </Link>
        <Link to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.OMEGA}`}>
          {constants.brands.OMEGA}
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
        <Link to={constants.routes.BRANDS}>{strings.more}</Link>
      </div>
    );
  }
}
export default Landing;
