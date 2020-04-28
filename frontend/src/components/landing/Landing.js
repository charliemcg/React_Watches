import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import strings from "./strings";
import styles from "./styles";
import Carousel from "./Carousel";

class Landing extends Component {
  render() {
    return (
      <div style={styles.masterContainer}>
        <div style={styles.subNav}>
          <div style={styles.subNavBtnWrapper}>
            <Link
              to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.ROLEX}`}
              style={styles.subNavBtn}
            >
              {constants.brands.ROLEX}
            </Link>
            <Link
              to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.OMEGA}`}
              style={styles.subNavBtn}
            >
              {constants.brands.OMEGA}
            </Link>
            <Link
              to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.PATEK_PHILIPPE}`}
              style={styles.subNavBtn}
            >
              {constants.brands.PATEK_PHILIPPE}
            </Link>
            <Link
              to={`${constants.routes.DYNAMIC_BRAND}${constants.routes.AUDEMARS_PIGUET}`}
              style={styles.subNavBtn}
            >
              {constants.brands.AUDEMARS_PIGUET}
            </Link>
            <Link to={constants.routes.BRANDS} style={styles.subNavBtn}>
              {strings.more}
            </Link>
          </div>
          <div style={styles.warranty}>{strings.warranty}</div>
        </div>
        <div style={styles.carouselWrapper}>Content goes here</div>
        <div style={styles.descriptionWrapper}>{strings.description}</div>
      </div>
    );
  }
}
export default Landing;
