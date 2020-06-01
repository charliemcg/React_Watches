import React from "react";
import constants from "../../constants";
import "./styles/styles.css";
import strings from "./strings";

export default function ProductPreview(props) {
  const { watch } = props;
  return (
    <div
      style={{ textDecoration: "none", cursor: "pointer" }}
      onClick={() => {
        window.location.href = `${constants.routes.PRODUCT}/${watch.brand}/${watch._id}`;
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
    </div>
  );
}
