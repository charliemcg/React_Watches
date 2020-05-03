import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import strings from "./strings";
import info from "./graphics/info.png";
import styles from "./covidStyles";

export default class Covid extends Component {
  render() {
    return (
      <div style={styles.masterWrapper}>
        <div style={styles.messageWrapper}>
          <img alt="" src={info} style={styles.infoIcon} />
          {strings.covid}
        </div>
        <div onClick={this.props.removeBanner} style={styles.x}>
          X
        </div>
      </div>
    );
  }
}
