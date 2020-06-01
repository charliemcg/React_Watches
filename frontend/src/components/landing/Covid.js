import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import strings from "./strings";
import info from "./graphics/info.png";
import "./styles/styles.css";

export default function Covid(props) {
  return (
    <div id="banner-wrapper">
      <div id="message-wrapper">
        <img alt="" src={info} id="info-icon" />
        {strings.covid}
      </div>
      <div onClick={props.removeBanner} id="x">
        x
      </div>
    </div>
  );
}
