import React from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import "./styles/styles.css";
import strings from "./strings";

export default function ProductPreview(props) {
  const { watch, changePath } = props;
  return (
    <Link
      style={{ textDecoration: "none", cursor: "pointer" }}
      to={`${constants.routes.PRODUCT}/${watch.brand}/${watch._id}`}
      onClick={() => {
        if (changePath) {
          changePath(`${constants.routes.PRODUCT}/${watch.brand}/${watch._id}`);
        }
      }}
    >
      <div id="product-preview-item-wrapper">
        <img
          id="product-preview-thumbnail"
          src={`data:image/jpeg;base64,${watch.image}`}
          alt={strings.accessibility.productImage}
        />
        <div>{watch.model}</div>
        <div>${watch.price}</div>
      </div>
    </Link>
  );
}
