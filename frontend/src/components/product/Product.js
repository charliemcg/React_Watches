import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import constants from "../../constants";
import styles from "./styles";
import strings from "./strings";
import ProductPreview from "../productPreview/ProductPreview";
import zoom from "./graphics/zoom.png";

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      watch: {},
      otherWatches: [],
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    axios
      .get(`${constants.api.WATCHES}/${params.brand}/${params.model}`)
      .then((res) => {
        this.setState({ watch: res.data });
        this.getOtherWatches();
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data,
        // });
      });
  }

  getOtherWatches = () => {
    axios
      .get(`${constants.api.WATCHES}/${this.state.watch.brand}`)
      .then((res) => {
        this.setState({ otherWatches: res.data });
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data,
        // });
      });
  };

  render() {
    const { watch } = this.state;
    const otherWatches = this.state.otherWatches
      .filter((watch) => watch.inStock)
      .map((watch) => {
        return <ProductPreview watch={watch} />;
      });
    const caseKey = watch.case && <p>{strings.case}</p>;
    const braceletKey = watch.case && <p>{strings.bracelet}</p>;
    const dialKey = watch.case && <p>{strings.dial}</p>;
    const diameterKey = watch.case && <p>{strings.diameter}</p>;
    const movementKey = watch.case && <p>{strings.movement}</p>;

    return (
      <div style={styles.masterWrapper}>
        <div style={styles.topWrapper}>
          <div style={styles.imageWrapper}>
            <img
              alt={strings.accessibility.productImage}
              src={`data:image/jpeg;base64,${watch.image}`}
              style={styles.image}
            />
            <div style={styles.zoom}>
              {strings.clickToZoom}
              <img alt="" src={zoom} style={styles.zoomIcon} />
            </div>
          </div>
          <div style={styles.detailsWrapper}>
            <div style={styles.title}>{watch.brand}</div>
            <div style={styles.model}>{watch.model}</div>
            <div style={styles.buyWrapper}>
              <div style={styles.priceWrapper}>${watch.price}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link
                  to={constants.routes.UNDER_CONSTRUCTION}
                  style={styles.btnWrapper}
                >
                  <div style={styles.buyBtn}>{strings.buy}</div>
                </Link>
                <Link
                  to={constants.routes.UNDER_CONSTRUCTION}
                  style={styles.btnWrapper}
                >
                  <div style={styles.financeBtn}>{strings.finance}</div>
                </Link>
              </div>
            </div>
            <div style={styles.divider} />
            <p>{watch.description}</p>
            <div style={styles.specs}>
              <div style={styles.properties}>
                {caseKey}
                {braceletKey}
                {dialKey}
                {diameterKey}
                {movementKey}
                <p>{strings.complications}</p>
              </div>
              <div style={styles.values}>
                <p>{watch.case}</p>
                <p>{watch.bracelet}</p>
                <p>{watch.dial}</p>
                <p>{watch.diameter}</p>
                <p>{watch.movement}</p>
                <p style={{ color: "pink" }}>null</p>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.others}>
          {strings.otherWatchesBy}
          {watch.brand}
        </div>
        <div style={styles.bottomWrapper}>{otherWatches}</div>
      </div>
    );
  }
}
