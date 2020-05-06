import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import styles from "./styles";
import strings from "./strings";

export default class ProductPreview extends Component {
  render() {
    const { watch } = this.props;
    return (
      <Link
        to={`${constants.routes.PRODUCT}/${watch.brand}/${watch._id}`}
        style={{ textDecoration: "none" }}
      >
        <div style={styles.itemWrapper}>
          <img
            style={styles.thumbnail}
            src={`data:image/jpeg;base64,${watch.image}`}
            alt={strings.accessibility.productImage}
          />
          <div>{watch.model}</div>
          <div>${watch.price}</div>
        </div>
      </Link>
    );
  }
}
