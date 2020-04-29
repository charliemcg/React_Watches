import React, { Component } from "react";
import axios from "axios";
import constants from "../../constants";
import styles from "./styles";
import strings from "./strings";
import ProductPreview from "../productPreview/ProductPreview";

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
    return (
      <div style={styles.masterWrapper}>
        <div style={styles.topWrapper}>
          <div style={styles.imageWrapper}>
            <img
              src={`data:image/jpeg;base64,${watch.image}`}
              style={styles.image}
            />
            <p>{strings.clickToZoom}</p>
          </div>
          <div style={styles.detailsWrapper}>
            <div style={styles.title}>{watch.brand}</div>
            <div style={styles.model}>{watch.model}</div>
            <div style={styles.buyWrapper}>
              <div style={styles.priceWrapper}>${watch.price}</div>
              <div style={styles.buyBtnWrapper}>
                <div style={styles.buy}>Buy</div>
              </div>
              <div style={styles.finance}>Finance</div>
            </div>
            <div style={styles.divider} />
            <p>{watch.description}</p>
            <div style={styles.specs}>
              <div style={styles.properties}>
                <p>{strings.case}</p>
                <p>{strings.bracelet}</p>
                <p>{strings.dial}</p>
                <p>{strings.diameter}</p>
                <p>{strings.movement}</p>
                <p>{strings.complications}</p>
              </div>
              <div style={styles.values}>
                <p style={{ color: "pink" }}>Steel</p>
                <p style={{ color: "pink" }}>Steel</p>
                <p style={{ color: "pink" }}>Black</p>
                <p style={{ color: "pink" }}>41mm</p>
                <p style={{ color: "pink" }}>Automatic</p>
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
