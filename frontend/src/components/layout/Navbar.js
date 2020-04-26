import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import strings from "./strings";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div>
            <Link to={constants.routes.HOME} style={{ color: "pink" }}>
              MERN
            </Link>
            <Link to={constants.routes.BRANDS}>{strings.watches}</Link>
            <Link to={constants.routes.ABOUT}>{strings.about}</Link>
            <Link to={constants.routes.CONTACT}>{strings.contact}</Link>
            <Link to={constants.routes.CART}>{strings.cart}</Link>
            <Link to={constants.routes.ADMIN} style={{ color: "pink" }}>
              Admin
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
