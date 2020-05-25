import React, { useState, useEffect } from "react";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";
import axios from "axios";
import constants from "../../constants";
import styles from "./styles";
import bannerRolex from "./graphics/bannerRolex2.png";
import bannerOmega from "./graphics/bannerOmega2.png";
import bannerPatek from "./graphics/bannerPatek2.png";
import bannerAudemars from "./graphics/bannerAudemars2.png";
import bannerCartier from "./graphics/bannerCartier2.png";
import bannerVacheron from "./graphics/bannerVacheron2.png";
import bannerBreguet from "./graphics/bannerBreguet2.png";
import bannerChopard from "./graphics/bannerChopard2.png";
import bannerPanerai from "./graphics/bannerPanerai2.png";
import bannerMille from "./graphics/bannerMille2.png";
import ProductPreview from "../productPreview/ProductPreview";
import strings from "./strings";

export default function SelectedBrand(props) {
  const [watches, setWatches] = useState([]);
  const { match } = props;

  useEffect(() => {
    //don't want it to keep requesting data if it's already been received
    if (watches.length === 0) {
      const getThisBrand = {
        query: `
        query { 
          watches(watchBrand: "${match.params.brand}"){
            _id
            brand
            model
            price
            inStock
            image
          }
        }
      `,
      };
      axios({
        url: "/graphql",
        method: "post",
        data: JSON.stringify(getThisBrand),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setWatches(res.data.data.watches);
        })
        .catch((err) => {
          console.log(`Cannot get watches ${err}`);
        });
    }
  });

  //TODO do something more elegant than this
  const getBanner = () => {
    switch (match.params.brand) {
      case "Rolex":
        return bannerRolex;
      case "Omega":
        return bannerOmega;
      case "Patek Philippe":
        return bannerPatek;
      case "Audemars Piguet":
        return bannerAudemars;
      case "Cartier":
        return bannerCartier;
      case "Vacheron Constantin":
        return bannerVacheron;
      case "Breguet":
        return bannerBreguet;
      case "Chopard":
        return bannerChopard;
      case "Panerai":
        return bannerPanerai;
      case "Richard Mille":
        return bannerMille;
      default:
        return "Rolex";
    }
  };

  const renderedWatches = watches
    .filter((watch) => watch.inStock)
    .map((watch) => {
      return <ProductPreview watch={watch} />;
    });

  const activityIndicator = (
    <div style={styles.activityIndicator}>
      <Dots />
    </div>
  );

  return (
    <div style={styles.masterWrapper}>
      <div style={styles.banner}>
        <img
          alt={`${strings.accessibility.banner} ${match.params.brand}`}
          src={getBanner()}
          style={{ width: "100%" }}
        />
      </div>
      <div style={styles.watchesScrollWrapper}>
        {watches.length > 0 ? renderedWatches : activityIndicator}
      </div>
    </div>
  );
}
