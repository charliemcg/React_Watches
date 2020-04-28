import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import collection from "./graphics/jumbotron_collection.jpg";
import daytona from "./graphics/jumbotron_daytona.jpg";
import finance from "./graphics/jumbotron_finance.jpg";
import overseas from "./graphics/jumbotron_overseas.jpg";
import patek from "./graphics/jumbotron_patek.jpg";

const sources = [collection, daytona, finance, overseas, patek];

const images = sources.map((img) => {
  return (
    <div>
      <img alt="" src={img} />
    </div>
  );
});

export default () => (
  <div style={{ height: "500px", width: "800px" }}>
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
