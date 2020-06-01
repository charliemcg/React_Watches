import React, { useState } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import strings from "./strings";
import "./styles/styles.css";
import Carousel from "./Carousel";
import Covid from "./Covid";

export default function Landing() {
  const [showBanner, toggleBanner] = useState(true);

  const banner = showBanner && (
    <Covid removeBanner={() => toggleBanner(false)} />
  );

  return (
    <div id="master-home-wrapper">
      {banner}
      <div id="sub-nav">
        <div id="sub-nav-btn-wrapper">
          <Link
            to={`${constants.routes.BRANDS}${constants.routes.ROLEX}`}
            className="home-sub-nav-btn"
          >
            {constants.brands.ROLEX}
          </Link>
          <Link
            to={`${constants.routes.BRANDS}${constants.routes.OMEGA}`}
            className="home-sub-nav-btn"
          >
            {constants.brands.OMEGA}
          </Link>
          <Link
            to={`${constants.routes.BRANDS}${constants.routes.PATEK_PHILIPPE}`}
            className="home-sub-nav-btn"
          >
            {constants.brands.PATEK_PHILIPPE}
          </Link>
          <Link
            to={`${constants.routes.BRANDS}${constants.routes.AUDEMARS_PIGUET}`}
            className="home-sub-nav-btn"
          >
            {constants.brands.AUDEMARS_PIGUET}
          </Link>
          <Link
            to={`${constants.routes.BRANDS}${constants.routes.CARTIER}`}
            className="home-sub-nav-btn"
          >
            {constants.brands.CARTIER}
          </Link>
          <Link to={constants.routes.BRANDS} className="home-sub-nav-btn">
            {strings.more}
          </Link>
        </div>
        <div id="warranty">{strings.warranty}</div>
      </div>
      <div id="carousel-wrapper">
        <Carousel />
      </div>
      <div id="description-title">{strings.descriptionTitle}</div>
      <div id="description-wrapper">{strings.description}</div>
    </div>
  );
}
