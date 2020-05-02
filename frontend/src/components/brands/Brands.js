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
import strings from "./strings";

export default class Brands extends Component {
  render() {
    return (
      <div style={styles.masterWrapper}>
        <div style={styles.topRow}>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.ROLEX}`}
            >
              <img alt={strings.accessibility.rolexLogo} src={logoRolex} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.OMEGA}`}
            >
              <img alt={strings.accessibility.omegaLogo} src={logoOmega} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.PATEK_PHILIPPE}`}
            >
              <img alt={strings.accessibility.patekLogo} src={logoPatek} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.AUDEMARS_PIGUET}`}
            >
              <img
                alt={strings.accessibility.audemarsLogo}
                src={logoAudemars}
              />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.CARTIER}`}
            >
              <img alt={strings.accessibility.cartierLogo} src={logoCartier} />
            </Link>
          </div>
        </div>
        <div style={styles.bottomRow}>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.VACHERON_CONSTANTIN}`}
            >
              <img
                alt={strings.accessibility.vacheronLogo}
                src={logoVacheron}
              />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.BREGUET}`}
            >
              <img alt={strings.accessibility.breguetLogo} src={logoBreguet} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.CHOPARD}`}
            >
              <img alt={strings.accessibility.chopardLogo} src={logoChopard} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.PANERAI}`}
            >
              <img alt={strings.accessibility.paneraiLogo} src={logoPanerai} />
            </Link>
          </div>
          <div style={styles.itemWrapper}>
            <Link
              to={`${constants.routes.SELECTED_BRAND}${constants.routes.RICHARD_MILLE}`}
            >
              <img alt={strings.accessibility.milleLogo} src={logoMille} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
