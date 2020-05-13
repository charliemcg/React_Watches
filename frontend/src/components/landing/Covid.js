import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import strings from "./strings";
import info from "./graphics/info.png";
import styles from "./covidStyles";

export default function Covid(props) {
  return (
    <div style={styles.masterWrapper}>
      <div style={styles.messageWrapper}>
        <img alt="" src={info} style={styles.infoIcon} />
        {strings.covid}
      </div>
      <div onClick={props.removeBanner} style={styles.x}>
        x
      </div>
    </div>
  );
}
