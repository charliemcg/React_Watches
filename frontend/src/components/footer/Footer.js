import React, { Component } from "react";
import youtube from "./graphics/icon_youtube.png";
import instagram from "./graphics/icon_instagram.png";
import facebook from "./graphics/icon_facebook.png";
import twitter from "./graphics/icon_twitter.png";

export default class Cart extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "gray",
          width: "100%",
          height: "100dp",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            backgroundColor: "green",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ color: "pink" }}>Contact Us</p>
          <p style={{ color: "pink" }}>Careers</p>
          <p style={{ color: "pink" }}>Terms and Conditions</p>
          <p style={{ color: "pink" }}>Copyright</p>
        </div>
        <div
          style={{
            backgroundColor: "red",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <p style={{ color: "pink" }}>123 Fake Street</p>
            <p style={{ color: "pink" }}>SpringField ABC</p>
            <p style={{ color: "pink" }}>(01) 234 567 890</p>
          </div>
          <div>
            <img
              alt=""
              src={youtube}
              style={{ height: "20px", width: "20px" }}
            />
            <img
              alt=""
              src={instagram}
              style={{ height: "20px", width: "20px" }}
            />
            <img
              alt=""
              src={facebook}
              style={{ height: "20px", width: "20px" }}
            />
            <img
              alt=""
              src={twitter}
              style={{ height: "20px", width: "20px" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
