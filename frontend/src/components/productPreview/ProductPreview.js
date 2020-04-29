import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import styles from "./styles";

export default class ProductPreview extends Component {
  render() {
    const { watch } = this.props;
    return (
      <Link
        to={`${constants.routes.PRODUCT}/${watch.brand}/${watch.model}`}
        style={{ textDecoration: "none" }}
      >
        <div style={styles.itemWrapper}>
          <img
            style={styles.thumbnail}
            src={`data:image/jpeg;base64,${watch.image}`}
          />
          <div>{watch.model}</div>
          <div>${watch.price}</div>
        </div>
      </Link>
    );
  }
}
