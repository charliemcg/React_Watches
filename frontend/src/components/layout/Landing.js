import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import strings from "./strings";

class Landing extends Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <p style={{ color: "pink" }}>Put some content here</p>
            <br />
            <div>
              <Link to={constants.routes.SIGN_UP}>{strings.signUp}</Link>
            </div>
            <div>
              <Link to={constants.routes.SIGN_IN}>{strings.signIn}</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
