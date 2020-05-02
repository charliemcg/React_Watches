import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles";
import constants from "../../constants";
import logoRolex from "./graphics/logo_rolex3.png";
import imgRolex from "./graphics/rolex.png";
import logoOmega from "./graphics/logo_omega3.png";
import imgOmega from "./graphics/omega.png";
import logoPatek from "./graphics/logo_patek3.png";
import imgPatek from "./graphics/patek.png";
import logoAudemars from "./graphics/logo_audemars3.png";
import imgAudemars from "./graphics/audemars.png";
import logoCartier from "./graphics/logo_cartier3.png";
import imgCartier from "./graphics/cartier.png";
import logoVacheron from "./graphics/logo_vacheron3.png";
import imgVacheron from "./graphics/vacheron.png";
import logoBreguet from "./graphics/logo_breguet3.png";
import imgBreguet from "./graphics/breguet.png";
import logoChopard from "./graphics/logo_chopard3.png";
import imgChopard from "./graphics/chopard.png";
import logoPanerai from "./graphics/logo_panerai3.png";
import imgPanerai from "./graphics/panerai.png";
import logoMille from "./graphics/logo_mille3.png";
import imgMille from "./graphics/mille.png";
import strings from "./strings";

export default class Brands extends Component {
  constructor() {
    super();
    this.state = {
      onRolex: false,
      onOmega: false,
      onPatek: false,
      onAudemars: false,
      onCartier: false,
      onVacheron: false,
      onBreguet: false,
      onChopard: false,
      onPanerai: false,
      onMille: false,
    };
  }

  //TODO pass the brand in as a parameter to get rid of this code duplication
  onMouseEnterRolex = () => {
    this.setState({ onRolex: true });
  };

  onMouseLeaveRolex = () => {
    this.setState({ onRolex: false });
  };

  onMouseEnterOmega = () => {
    this.setState({ onOmega: true });
  };

  onMouseLeaveOmega = () => {
    this.setState({ onOmega: false });
  };

  onMouseEnterPatek = () => {
    this.setState({ onPatek: true });
  };

  onMouseLeavePatek = () => {
    this.setState({ onPatek: false });
  };

  onMouseEnterAudemars = () => {
    this.setState({ onAudemars: true });
  };

  onMouseLeaveAudemars = () => {
    this.setState({ onAudemars: false });
  };

  onMouseEnterCartier = () => {
    this.setState({ onCartier: true });
  };

  onMouseLeaveCartier = () => {
    this.setState({ onCartier: false });
  };

  onMouseEnterVacheron = () => {
    this.setState({ onVacheron: true });
  };

  onMouseLeaveVacheron = () => {
    this.setState({ onVacheron: false });
  };

  onMouseEnterBreguet = () => {
    this.setState({ onBreguet: true });
  };

  onMouseLeaveBreguet = () => {
    this.setState({ onBreguet: false });
  };

  onMouseEnterChopard = () => {
    this.setState({ onChopard: true });
  };

  onMouseLeaveChopard = () => {
    this.setState({ onChopard: false });
  };

  onMouseEnterPanerai = () => {
    this.setState({ onPanerai: true });
  };

  onMouseLeavePanerai = () => {
    this.setState({ onPanerai: false });
  };

  onMouseEnterMille = () => {
    this.setState({ onMille: true });
  };

  onMouseLeaveMille = () => {
    this.setState({ onMille: false });
  };

  render() {
    return (
      <div style={styles.masterWrapper}>
        <div style={styles.title}>{strings.brands}</div>
        <div style={styles.brandsWrapper}>
          <div style={styles.topRow}>
            <div style={styles.itemWrapper}>
              <Link
                to={`${constants.routes.SELECTED_BRAND}${constants.routes.ROLEX}`}
              >
                <img
                  alt={strings.accessibility.rolexLogo}
                  src={this.state.onRolex ? imgRolex : logoRolex}
                  onMouseEnter={this.onMouseEnterRolex}
                  onMouseLeave={this.onMouseLeaveRolex}
                />
              </Link>
            </div>
            <div style={styles.itemWrapper}>
              <Link
                to={`${constants.routes.SELECTED_BRAND}${constants.routes.OMEGA}`}
              >
                <img
                  alt={strings.accessibility.omegaLogo}
                  src={this.state.onOmega ? imgOmega : logoOmega}
                  onMouseEnter={this.onMouseEnterOmega}
                  onMouseLeave={this.onMouseLeaveOmega}
                />
              </Link>
            </div>
            <div style={styles.itemWrapper}>
              <Link
                to={`${constants.routes.SELECTED_BRAND}${constants.routes.PATEK_PHILIPPE}`}
              >
                <img
                  alt={strings.accessibility.patekLogo}
                  src={this.state.onPatek ? imgPatek : logoPatek}
                  onMouseEnter={this.onMouseEnterPatek}
                  onMouseLeave={this.onMouseLeavePatek}
                />
              </Link>
            </div>
            <div style={styles.itemWrapper}>
              <Link
                to={`${constants.routes.SELECTED_BRAND}${constants.routes.AUDEMARS_PIGUET}`}
              >
                <img
                  alt={strings.accessibility.audemarsLogo}
                  src={this.state.onAudemars ? imgAudemars : logoAudemars}
                  onMouseEnter={this.onMouseEnterAudemars}
                  onMouseLeave={this.onMouseLeaveAudemars}
                />
              </Link>
            </div>
            <div style={styles.itemWrapper}>
              <Link
                to={`${constants.routes.SELECTED_BRAND}${constants.routes.CARTIER}`}
              >
                <img
                  alt={strings.accessibility.cartierLogo}
                  src={this.state.onCartier ? imgCartier : logoCartier}
                  onMouseEnter={this.onMouseEnterCartier}
                  onMouseLeave={this.onMouseLeaveCartier}
                />
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
                  src={this.state.onVacheron ? imgVacheron : logoVacheron}
                  onMouseEnter={this.onMouseEnterVacheron}
                  onMouseLeave={this.onMouseLeaveVacheron}
                />
              </Link>
            </div>
            <div style={styles.itemWrapper}>
              <Link
                to={`${constants.routes.SELECTED_BRAND}${constants.routes.BREGUET}`}
              >
                <img
                  alt={strings.accessibility.breguetLogo}
                  src={this.state.onBreguet ? imgBreguet : logoBreguet}
                  onMouseEnter={this.onMouseEnterBreguet}
                  onMouseLeave={this.onMouseLeaveBreguet}
                />
              </Link>
            </div>
            <div style={styles.itemWrapper}>
              <Link
                to={`${constants.routes.SELECTED_BRAND}${constants.routes.CHOPARD}`}
              >
                <img
                  alt={strings.accessibility.chopardLogo}
                  src={this.state.onChopard ? imgChopard : logoChopard}
                  onMouseEnter={this.onMouseEnterChopard}
                  onMouseLeave={this.onMouseLeaveChopard}
                />
              </Link>
            </div>
            <div style={styles.itemWrapper}>
              <Link
                to={`${constants.routes.SELECTED_BRAND}${constants.routes.PANERAI}`}
              >
                <img
                  alt={strings.accessibility.paneraiLogo}
                  src={this.state.onPanerai ? imgPanerai : logoPanerai}
                  onMouseEnter={this.onMouseEnterPanerai}
                  onMouseLeave={this.onMouseLeavePanerai}
                />
              </Link>
            </div>
            <div style={styles.itemWrapper}>
              <Link
                to={`${constants.routes.SELECTED_BRAND}${constants.routes.RICHARD_MILLE}`}
              >
                <img
                  alt={strings.accessibility.milleLogo}
                  src={this.state.onMille ? imgMille : logoMille}
                  onMouseEnter={this.onMouseEnterMille}
                  onMouseLeave={this.onMouseLeaveMille}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
