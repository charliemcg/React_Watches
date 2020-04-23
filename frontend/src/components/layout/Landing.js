import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }}>
        <div>
          <div>
            <p>Put some content here</p>
            <br />
            <div>
              <Link
                to="/signUp"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
              >
                Sign Up
              </Link>
            </div>
            <div>
              <Link
                to="/signIn"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
