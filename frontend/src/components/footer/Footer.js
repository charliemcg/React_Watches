import React, { Component } from "react";
import { Link } from "react-router-dom";
import youtube from "./graphics/icon_youtube.png";
import instagram from "./graphics/icon_instagram.png";
import facebook from "./graphics/icon_facebook.png";
import twitter from "./graphics/icon_twitter.png";
import styles from "./styles";
import strings from "./strings";
import constants from "../../constants";

const year = new Date().getFullYear();

export default class Cart extends Component {
  render() {
    return (
      <div style={styles.footerWrapper}>
        <div style={styles.columnWrapper}>
          <div>
            <div>{strings.addressLineOne}</div>
            <div>{strings.addressLineTwo}</div>
          </div>
          <div>{strings.phone}</div>
        </div>
        <div style={styles.columnWrapper}>
          <Link to={constants.routes.UNDER_CONSTRUCTION} style={styles.link}>
            {strings.contactUs}
          </Link>
          <Link to={constants.routes.UNDER_CONSTRUCTION} style={styles.link}>
            {strings.careers}
          </Link>
          <Link to={constants.routes.UNDER_CONSTRUCTION} style={styles.link}>
            {strings.termsAndConditions}
          </Link>
        </div>
        <div style={styles.columnWrapper}>
          <div style={styles.socialWrapper}>
            <img alt="" src={youtube} style={styles.socialIcon} />
            <img alt="" src={instagram} style={styles.socialIcon} />
            <img alt="" src={facebook} style={styles.socialIcon} />
            <img alt="" src={twitter} style={styles.socialIcon} />
          </div>
          <div>
            {strings.copyright} {year}
          </div>
        </div>
      </div>
    );
  }
}
