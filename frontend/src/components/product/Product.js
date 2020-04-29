import React, { Component } from "react";
import axios from "axios";
import constants from "../../constants";
import styles from "./styles";
import strings from "./strings";

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      watch: {},
    };
  }
  componentDidMount() {
    const { params } = this.props.match;
    axios
      .get(`${constants.api.WATCHES}/${params.brand}/${params.model}`)
      .then((res) => {
        this.setState({ watch: res.data });
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data,
        // });
      });
  }
  render() {
    const { watch } = this.state;
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
                <p>Case: </p>
                <p>Bracelet: </p>
                <p>Dial: </p>
                <p>Diameter: </p>
                <p>Movement: </p>
                <p>Complications: </p>
              </div>
              <div style={styles.values}>
                <p>Steel</p>
                <p>Steel</p>
                <p>Black</p>
                <p>41mm</p>
                <p>Automatic</p>
                <p>null</p>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.others}>Other watches by Rolex</div>
        <div style={styles.bottomWrapper}>
          <p>Show other watches here</p>
        </div>
      </div>
    );
  }
}
