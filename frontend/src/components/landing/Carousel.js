import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import collection from "./graphics/jumbotron_collection.png";
import daytona from "./graphics/jumbotron_daytona.png";
import finance from "./graphics/jumbotron_finance.png";
import overseas from "./graphics/jumbotron_overseas.png";
import patek from "./graphics/jumbotron_patek.png";

const sources = [collection, daytona, finance, overseas, patek];

const images = sources.map((img) => {
  return (
    <div>
      <img alt="" src={img} />
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
