import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles";
import constants from "../../constants";
import logoRolex from "./graphics/logo_rolex.png";
import logoOmega from "./graphics/logo_omega.png";
import logoPatek from "./graphics/logo_patek.png";
import logoAudemars from "./graphics/logo_audemars.png";
import logoCartier from "./graphics/logo_cartier.png";
import logoVacheron from "./graphics/logo_vacheron.png";
import logoBreguet from "./graphics/logo_breguet.png";
import logoChopard from "./graphics/logo_chopard.png";
import logoPanerai from "./graphics/logo_panerai.png";
import logoMille from "./graphics/logo_mille.png";

export default class Brands extends Component {
  render() {
    return (
      <div style={styles.masterWrapper}>
        <div style={styles.topRow}>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.ROLEX}`}
            >
              <img alt="" src={logoRolex} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.OMEGA}`}
            >
              <img alt="" src={logoOmega} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.PATEK_PHILIPPE}`}
            >
              <img alt="" src={logoPatek} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.AUDEMARS_PIGUET}`}
            >
              <img alt="" src={logoAudemars} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.CARTIER}`}
            >
              <img alt="" src={logoCartier} />
            </Link>
          </div>
        </div>
        <div style={styles.bottomRow}>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.VACHERON_CONSTANTIN}`}
            >
              <img alt="" src={logoVacheron} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.BREGUET}`}
            >
              <img alt="" src={logoBreguet} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.CHOPARD}`}
            >
              <img alt="" src={logoChopard} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.PANERAI}`}
            >
              <img alt="" src={logoPanerai} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.RICHARD_MILLE}`}
            >
              <img alt="" src={logoMille} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
