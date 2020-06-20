import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dots } from "react-activity";
// import "react-activity/dist/react-activity.css";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions.js";
import axios from "axios";
import constants from "../../constants";
import "./styles/styles.css";
import strings from "./strings";
import ProductPreview from "../productPreview/ProductPreview";
import zoomImg from "./graphics/zoom.png";

function Product(props) {
  const [watch, setWatch] = useState({});
  const [otherWatches, setOtherWatches] = useState([]);
  const [zoom, toggleZoom] = useState(false);

  useEffect(function () {
    if (Object.keys(watch).length === 0) {
      const { params } = props.match;
      const getThisWatch = {
        query: `
      query {
        watch(watchId: "${params._id}"){
          _id
          brand
          model
          case
          bracelet
          dial
          diameter
          movement
          description
          price
          image
        }
      }
    `,
      };
      axios({
        url: "/graphql",
        method: "post",
        data: JSON.stringify(getThisWatch),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setWatch(res.data.data.watch);
          getOtherWatches();
        })
        .catch((err) => {
          console.log(`Cannot get watch ${err}`);
          window.location.href = "../../404";
        });
    }
  });

  const handleBuyClick = () => {
    props.addToCart(watch);
  };

  const changePath = () => {
    setWatch({});
  };

  const getOtherWatches = () => {
    const getThisBrand = {
      query: `
      query {
        watches(watchBrand: "${props.match.params.brand}"){
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
        setOtherWatches(res.data.data.watches);
      })
      .catch((err) => {
        console.log(`Cannot get watches ${err}`);
      });
  };

  const watchImage = `data:image/jpeg;base64,${watch.image}`;
  const otherWatchesRendered = otherWatches
    .filter((product) => product.inStock)
    .filter((product) => product._id !== watch._id)
    .map((watch, i) => {
      return <ProductPreview watch={watch} changePath={changePath} />;
    });
  const activityIndicator = (
    <div id="activity-indicator">
      <Dots />
    </div>
  );
  const imageFullSize = (
    <div id="full-image-wrapper">
      {/* Change this to an actual icon instead of just text */}
      <div
        onClick={() => toggleZoom(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "30px",
          cursor: "pointer",
          color: "white",
        }}
      >
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

  return !watch._id ? (
    <div id="product-loading-wrapper">
      <Dots />
    </div>
  ) : (
    <div id="master-product-wrapper">
      {zoom && imageFullSize}
      <div id="top-wrapper">
        <div id="image-wrapper">
          <img
            alt={strings.accessibility.productImage}
            src={watchImage}
            id="product-image"
            onClick={() => toggleZoom(true)}
          />
          <div id="zoom">
            {strings.clickToZoom}
            <img alt="" src={zoomImg} id="zoom-icon" />
          </div>
        </div>
        <div id="details-wrapper">
          <div id="title">{watch.brand}</div>
          <div id="model">{watch.model}</div>
          <div id="buy-wrapper">
            <div id="price-wrapper">${watch.price}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div id="btn-wrapper" onClick={() => handleBuyClick()}>
                <div id="buy-btn">{strings.buy}</div>
              </div>
              <Link to={constants.routes.UNDER_CONSTRUCTION} id="btn-wrapper">
                <div id="finance-btn">{strings.finance}</div>
              </Link>
            </div>
          </div>
          <div id="divider" />
          <p>{watch.description}</p>
          <div id="specs">
            <div id="properties">
              {caseKey}
              {braceletKey}
              {dialKey}
              {diameterKey}
              {movementKey}
              {complicationsKey}
            </div>
            <div id="values">
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
      <div id="others">
        {strings.otherWatchesBy}
        {watch.brand}
      </div>
      <div id="bottom-wrapper">
        {otherWatches.length > 0 ? otherWatchesRendered : activityIndicator}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addToCart })(Product);
