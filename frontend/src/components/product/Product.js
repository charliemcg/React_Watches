import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";
import axios from "axios";
import constants from "../../constants";
import styles from "./styles";
import strings from "./strings";
import ProductPreview from "../productPreview/ProductPreview";
import zoomImg from "./graphics/zoom.png";

export default function Product(props) {
  const [watch, setWatch] = useState({});
  const [otherWatches, setOtherWatches] = useState([]);
  const [zoom, toggleZoom] = useState(false);

  useEffect(function () {
    const { params } = props.match;
    axios
      .get(`${constants.api.WATCHES}/${params.brand}/${params._id}`)
      .then((res) => {
        setWatch(res.data);
        getOtherWatches();
      })
      .catch((err) => {
        console.log(`Error getting the product: ${err}`);
        window.location.href = "../../404";
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data,
        // });
      });
  });

  const getOtherWatches = () => {
    axios
      .get(`${constants.api.WATCHES}/${watch.brand}`)
      .then((res) => {
        setOtherWatches(res.data);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data,
        // });
      });
  };

  const watchImage = `data:image/jpeg;base64,${watch.image}`;
  const otherWatchesRendered = otherWatches
    .filter((product) => product.inStock)
    .filter((product) => product._id !== watch._id)
    .map((watch, i) => {
      return <ProductPreview watch={watch} />;
    });
  const activityIndicator = (
    <div style={styles.activityIndicator}>
      <Dots />
    </div>
  );
  const imageFullSize = (
    <div style={styles.fullImageWrapper}>
      {/* Change this to an actual icon instead of just text */}
      <div style={styles.fullImageClose} onClick={() => toggleZoom(false)}>
        x
      </div>
      <img
        alt={strings.accessibility.fullImage}
        src={watchImage}
        style={{ maxHeight: "100%" }}
      />
    </div>
  );
  const caseKey = watch.case && <p>{strings.case}</p>;
  const braceletKey = watch.bracelet && <p>{strings.bracelet}</p>;
  const dialKey = watch.dial && <p>{strings.dial}</p>;
  const diameterKey = watch.diameter && <p>{strings.diameter}</p>;
  const movementKey = watch.movement && <p>{strings.movement}</p>;
  const complicationsKey = watch.complications !== undefined &&
    watch.complications.length > 0 && <p>{strings.complications}</p>;
  const complications =
    watch.complications !== undefined &&
    watch.complications.map((e, i) => {
      return i > 0 ? `, ${e}` : e;
    });

  return (
    <div style={styles.masterWrapper}>
      {zoom && imageFullSize}
      <div style={styles.topWrapper}>
        <div style={styles.imageWrapper}>
          <img
            alt={strings.accessibility.productImage}
            src={watchImage}
            style={styles.image}
            onClick={() => toggleZoom(true)}
          />
          <div style={styles.zoom}>
            {strings.clickToZoom}
            <img alt="" src={zoomImg} style={styles.zoomIcon} />
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
              {complicationsKey}
            </div>
            <div style={styles.values}>
              <p>{watch.case}</p>
              <p>{watch.bracelet}</p>
              <p>{watch.dial}</p>
              <p>{watch.diameter}</p>
              <p>{watch.movement}</p>
              <p>{complications}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={styles.others}>
        {strings.otherWatchesBy}
        {watch.brand}
      </div>
      <div style={styles.bottomWrapper}>
        {otherWatches.length > 0 ? otherWatchesRendered : activityIndicator}
      </div>
    </div>
  );
}
