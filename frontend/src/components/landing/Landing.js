import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import strings from "./strings";
import styles from "./styles";
import Carousel from "./Carousel";
import Covid from "./Covid";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  removeBanner = () => {
    this.setState({ show: false });
  };

  render() {
    const banner = this.state.show && (
      <Covid removeBanner={this.removeBanner} />
    );
    return (
      <div style={styles.masterWrapper}>
        {banner}
        <div style={styles.subNav}>
          <div style={styles.subNavBtnWrapper}>
            <Link
              to={`${constants.routes.BRANDS}${constants.routes.ROLEX}`}
              style={styles.subNavBtn}
            >
              {constants.brands.ROLEX}
            </Link>
            <Link
              to={`${constants.routes.BRANDS}${constants.routes.OMEGA}`}
              style={styles.subNavBtn}
            >
              {constants.brands.OMEGA}
            </Link>
            <Link
              to={`${constants.routes.BRANDS}${constants.routes.PATEK_PHILIPPE}`}
              style={styles.subNavBtn}
            >
              {constants.brands.PATEK_PHILIPPE}
            </Link>
            <Link
              to={`${constants.routes.BRANDS}${constants.routes.AUDEMARS_PIGUET}`}
              style={styles.subNavBtn}
            >
              {constants.brands.AUDEMARS_PIGUET}
            </Link>
            <Link
              to={`${constants.routes.BRANDS}${constants.routes.CARTIER}`}
              style={styles.subNavBtn}
            >
              {constants.brands.CARTIER}
            </Link>
            <Link to={constants.routes.BRANDS} style={styles.subNavBtn}>
              {strings.more}
            </Link>
          </div>
          <div style={styles.warranty}>{strings.warranty}</div>
        </div>
        <div style={styles.carouselWrapper}>
          <Carousel />
        </div>
        <div style={styles.descriptionTitle}>{strings.descriptionTitle}</div>
        <div style={styles.descriptionWrapper}>{strings.description}</div>
      </div>
    );
  }
}
export default Landing;
