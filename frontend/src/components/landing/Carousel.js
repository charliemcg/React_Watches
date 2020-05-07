import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import collection from "./graphics/jumbotron_collection.png";
import daytona from "./graphics/jumbotron_daytona.png";
import finance from "./graphics/jumbotron_finance.png";
import overseas from "./graphics/jumbotron_overseas.png";
import patek from "./graphics/jumbotron_patek.png";
import constants from "../../constants";

const imageDetails = [
  { src: collection, alt: "", route: constants.routes.UNDER_CONSTRUCTION },
  //http://localhost:3000/product/Rolex/5ea64568541b50053c8a41db
  {
    src: daytona,
    alt: "",
    route: `${constants.routes.PRODUCT}/${constants.brands.ROLEX}/5ea64568541b50053c8a41db`,
  },
  { src: finance, alt: "", route: constants.routes.UNDER_CONSTRUCTION },
  {
    src: overseas,
    alt: "",
    route: `${constants.routes.BRANDS}/${constants.brands.VACHERON_CONSTANTIN}`,
  },
  {
    src: patek,
    alt: "",
    route: `${constants.routes.BRANDS}/${constants.brands.PATEK_PHILIPPE}`,
  },
];

const images = imageDetails.map((details, i) => {
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => (window.location.href = details.route)}
    >
      <img alt={details.alt} src={details.src} />
    </div>
  );
});

export default () => (
  <div>
    <Carousel
      autoPlay
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
    >
      {images}
    </Carousel>
  </div>
);
