import React, { Component } from "react";
import axios from "axios";
import constants from "../../constants";
import styles from "./styles";
import bannerRolex from "./graphics/bannerRolex.png";
import bannerOmega from "./graphics/bannerOmega.png";
import bannerPatek from "./graphics/bannerPatek.png";
import bannerAudemars from "./graphics/bannerAudemars.png";
import bannerCartier from "./graphics/bannerCartier.png";
import bannerVacheron from "./graphics/bannerVacheron.png";
import bannerBreguet from "./graphics/bannerBreguet.png";
import bannerChopard from "./graphics/bannerChopard.png";
import bannerPanerai from "./graphics/bannerPanerai.png";
import bannerMille from "./graphics/bannerMille.png";
import ProductPreview from "../productPreview/ProductPreview";
import strings from "./strings";

export default class SelectedBrand extends Component {
  constructor() {
    super();
    this.state = {
      watches: [],
    };
  }
  componentDidMount() {
    axios
      .get(`${constants.api.WATCHES}/${this.props.match.params.brand}`)
      .then((res) => {
        this.setState({ watches: res.data });
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data,
        // });
      });
  }

  //TODO do something more elegant than this
  getBanner = () => {
    switch (this.props.match.params.brand) {
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
    }
  };

  render() {
    const watches = this.state.watches
      .filter((watch) => watch.inStock)
      .map((watch) => {
        return <ProductPreview watch={watch} />;
      });
    return (
      <div style={styles.masterWrapper}>
        <div style={styles.banner}>
          <img
            alt={`${strings.accessibility.banner} ${this.props.match.params.brand}`}
            src={this.getBanner()}
          />
        </div>
        <div style={styles.title}>{this.props.match.params.brand}</div>
        <div style={styles.watchesScrollWrapper}>{watches}</div>
      </div>
    );
  }
}
