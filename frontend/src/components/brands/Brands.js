import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/styles.css";
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

export default function Brands() {
  //Need to know which brand the mouse is hovering over.
  //This will be used for changing the image on mouse over.
  const [brands, setMouseOver] = useState({
    rolex: false,
    omega: false,
    patek: false,
    audemars: false,
    cartier: false,
    vacheron: false,
    breguet: false,
    chopard: false,
    panerai: false,
    mille: false,
  });

  //save in state the brand that has mouse over
  const triggerChangeImage = (brand) => {
    setMouseOver({ [brand]: !brands[brand] });
  };

  //getting all the brands from state
  const itemsArr = [];
  for (let [key] of Object.entries(brands)) {
    itemsArr.push(key);
  }

  //getting properties for each brand
  const getProperties = (brand) => {
    switch (brand) {
      case strings.keys.rolex:
        return {
          route: constants.routes.ROLEX,
          accessibility: strings.accessibility.rolexLogo,
          image: imgRolex,
          logo: logoRolex,
        };
      case strings.keys.omega:
        return {
          route: constants.routes.OMEGA,
          accessibility: strings.accessibility.omegaLogo,
          image: imgOmega,
          logo: logoOmega,
        };
      case strings.keys.patek:
        return {
          route: constants.routes.PATEK_PHILIPPE,
          accessibility: strings.accessibility.patekLogo,
          image: imgPatek,
          logo: logoPatek,
        };
      case strings.keys.audemars:
        return {
          route: constants.routes.AUDEMARS_PIGUET,
          accessibility: strings.accessibility.audemarsLogo,
          image: imgAudemars,
          logo: logoAudemars,
        };
      case strings.keys.cartier:
        return {
          route: constants.routes.CARTIER,
          accessibility: strings.accessibility.cartierLogo,
          image: imgCartier,
          logo: logoCartier,
        };
      case strings.keys.vacheron:
        return {
          route: constants.routes.VACHERON_CONSTANTIN,
          accessibility: strings.accessibility.vacheronLogo,
          image: imgVacheron,
          logo: logoVacheron,
        };
      case strings.keys.breguet:
        return {
          route: constants.routes.BREGUET,
          accessibility: strings.accessibility.breguetLogo,
          image: imgBreguet,
          logo: logoBreguet,
        };
      case strings.keys.chopard:
        return {
          route: constants.routes.CHOPARD,
          accessibility: strings.accessibility.chopardLogo,
          image: imgChopard,
          logo: logoChopard,
        };
      case strings.keys.panerai:
        return {
          route: constants.routes.PANERAI,
          accessibility: strings.accessibility.paneraiLogo,
          image: imgPanerai,
          logo: logoPanerai,
        };
      case strings.keys.mille:
        return {
          route: constants.routes.RICHARD_MILLE,
          accessibility: strings.accessibility.milleLogo,
          image: imgMille,
          logo: logoMille,
        };
      default:
        return null;
    }
  };

  //creating the view for each brand
  const getRenderedItem = (item) => {
    const brandProperties = getProperties(item);
    return (
      brandProperties !== undefined && (
        <div id="item-wrapper">
          <Link to={`${constants.routes.BRANDS}${brandProperties.route}`}>
            <img
              alt={brandProperties.accessibility}
              //Show brand logo by default. Show product image on mouse over.
              src={brands[item] ? brandProperties.image : brandProperties.logo}
              onMouseEnter={() => triggerChangeImage(item)}
              onMouseLeave={() => triggerChangeImage(item)}
            />
          </Link>
        </div>
      )
    );
  };

  return (
    <div id="master-brands-wrapper">
      <div id="title">{strings.brands}</div>
      <div id="brands-wrapper">
        <div className="brands-row">
          {getRenderedItem(strings.keys.rolex)}
          {getRenderedItem(strings.keys.omega)}
          {getRenderedItem(strings.keys.patek)}
          {getRenderedItem(strings.keys.audemars)}
          {getRenderedItem(strings.keys.cartier)}
        </div>
        <div className="brands-row">
          {getRenderedItem(strings.keys.vacheron)}
          {getRenderedItem(strings.keys.breguet)}
          {getRenderedItem(strings.keys.chopard)}
          {getRenderedItem(strings.keys.panerai)}
          {getRenderedItem(strings.keys.mille)}
        </div>
      </div>
    </div>
  );
}
