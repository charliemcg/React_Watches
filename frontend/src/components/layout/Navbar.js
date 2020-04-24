import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div>
            <Link to="/">MERN</Link>
            <Link to="/brands">Watches</Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
