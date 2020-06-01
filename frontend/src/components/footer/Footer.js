import React from "react";
import { Link } from "react-router-dom";
import youtube from "./graphics/icon_youtube.png";
import instagram from "./graphics/icon_instagram.png";
import facebook from "./graphics/icon_facebook.png";
import twitter from "./graphics/icon_twitter.png";
import "./styles/styles.css";
import strings from "./strings";
import constants from "../../constants";

const year = new Date().getFullYear();

export default function Cart() {
  return (
    <div id="background">
      <div id="footer-wrapper">
        <div className="footer-column-wrapper">
          <div>
            <div>{strings.addressLineOne}</div>
            <div>{strings.addressLineTwo}</div>
          </div>
          <div>{strings.phone}</div>
        </div>
        <div className="footer-column-wrapper">
          <Link
            to={constants.routes.UNDER_CONSTRUCTION}
            className="footer-link"
          >
            {strings.contactUs}
          </Link>
          <Link
            to={constants.routes.UNDER_CONSTRUCTION}
            className="footer-link"
          >
            {strings.careers}
          </Link>
          <Link
            to={constants.routes.UNDER_CONSTRUCTION}
            className="footer-link"
          >
            {strings.termsAndConditions}
          </Link>
        </div>
        <div className="footer-column-wrapper">
          <div id="social-wrapper">
            <Link to={constants.routes.UNDER_CONSTRUCTION}>
              <img
                alt={strings.accessibility.youtube}
                src={youtube}
                className="footer-social-icon"
              />
            </Link>
            <Link to={constants.routes.UNDER_CONSTRUCTION}>
              <img
                alt={strings.accessibility.instagram}
                src={instagram}
                className="footer-social-icon"
              />
            </Link>
            <Link to={constants.routes.UNDER_CONSTRUCTION}>
              <img
                alt={strings.accessibility.facebook}
                src={facebook}
                className="footer-social-icon"
              />
            </Link>
            <Link to={constants.routes.UNDER_CONSTRUCTION}>
              <img
                alt={strings.accessibility.twitter}
                src={twitter}
                className="footer-social-icon"
              />
            </Link>
          </div>
          <div>
            {strings.copyright} {year}
          </div>
        </div>
      </div>
    </div>
  );
}
