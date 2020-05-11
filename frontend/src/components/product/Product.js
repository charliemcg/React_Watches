import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";
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
      zoom: false,
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    axios
      .get(`${constants.api.WATCHES}/${params.brand}/${params._id}`)
      .then((res) => {
        this.setState({ watch: res.data });
        this.getOtherWatches();
      })
      .catch((err) => {
        console.log(`Error getting the product: ${err}`);
        window.location.href = "../../404";
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data,
        // });
      });
  }

  zoom = () => {
    this.setState({
      zoom: !this.state.zoom,
    });
  };

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
    const watchImage = `data:image/jpeg;base64,${watch.image}`;
    const otherWatches = this.state.otherWatches
      .filter((product) => product.inStock)
      .filter((product) => product._id != watch._id)
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
        <div style={styles.fullImageClose} onClick={this.zoom}>
          X
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
        {this.state.zoom && imageFullSize}
        <div style={styles.topWrapper}>
          <div style={styles.imageWrapper}>
            <img
              alt={strings.accessibility.productImage}
              src={watchImage}
              style={styles.image}
              onClick={this.zoom}
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
          {this.state.otherWatches.length > 0
            ? otherWatches
            : activityIndicator}
        </div>
      </div>
    );
  }
}

// export default class Product extends Component {
//   constructor() {
//     super();
//     this.state = {
//       watch: {},
//       otherWatches: [],
//       zoom: false,
//     };
//   }

//   componentDidMount() {
//     const { params } = this.props.match;
//     axios
//       .get(`${constants.api.WATCHES}/${params.brand}/${params._id}`)
//       .then((res) => {
//         this.setState({ watch: res.data });
//         this.getOtherWatches();
//       })
//       .catch((err) => {
//         console.log(`Error getting the product: ${err}`);
//         window.location.href = "../../404";
//         // dispatch({
//         //   type: GET_ERRORS,
//         //   payload: err.response.data,
//         // });
//       });
//   }

//   zoom = () => {
//     this.setState({
//       zoom: !this.state.zoom,
//     });
//   };

//   getOtherWatches = () => {
//     axios
//       .get(`${constants.api.WATCHES}/${this.state.watch.brand}`)
//       .then((res) => {
//         this.setState({ otherWatches: res.data });
//       })
//       .catch((err) => {
//         console.log(`error: ${err}`);
//         // dispatch({
//         //   type: GET_ERRORS,
//         //   payload: err.response.data,
//         // });
//       });
//   };

//   render() {
//     const { watch } = this.state;
//     const watchImage = `data:image/jpeg;base64,${watch.image}`;
//     const otherWatches = this.state.otherWatches
//       .filter((product) => product.inStock)
//       .filter((product) => product._id != watch._id)
//       .map((watch, i) => {
//         return <ProductPreview watch={watch} />;
//       });
//     const activityIndicator = (
//       <div style={styles.activityIndicator}>
//         <Dots />
//       </div>
//     );
//     const imageFullSize = (
//       <div style={styles.fullImageWrapper}>
//         {/* Change this to an actual icon instead of just text */}
//         <div style={styles.fullImageClose} onClick={this.zoom}>
//           X
//         </div>
//         <img
//           alt={strings.accessibility.fullImage}
//           src={watchImage}
//           style={{ maxHeight: "100%" }}
//         />
//       </div>
//     );
//     const caseKey = watch.case && <p>{strings.case}</p>;
//     const braceletKey = watch.bracelet && <p>{strings.bracelet}</p>;
//     const dialKey = watch.dial && <p>{strings.dial}</p>;
//     const diameterKey = watch.diameter && <p>{strings.diameter}</p>;
//     const movementKey = watch.movement && <p>{strings.movement}</p>;
//     const complicationsKey = watch.complications !== undefined &&
//       watch.complications.length > 0 && <p>{strings.complications}</p>;
//     const complications =
//       watch.complications !== undefined &&
//       watch.complications.map((e, i) => {
//         return i > 0 ? `, ${e}` : e;
//       });

//     return (
//       <div style={styles.masterWrapper}>
//         {this.state.zoom && imageFullSize}
//         <div style={styles.topWrapper}>
//           <div style={styles.imageWrapper}>
//             <img
//               alt={strings.accessibility.productImage}
//               src={watchImage}
//               style={styles.image}
//               onClick={this.zoom}
//             />
//             <div style={styles.zoom}>
//               {strings.clickToZoom}
//               <img alt="" src={zoom} style={styles.zoomIcon} />
//             </div>
//           </div>
//           <div style={styles.detailsWrapper}>
//             <div style={styles.title}>{watch.brand}</div>
//             <div style={styles.model}>{watch.model}</div>
//             <div style={styles.buyWrapper}>
//               <div style={styles.priceWrapper}>${watch.price}</div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Link
//                   to={constants.routes.UNDER_CONSTRUCTION}
//                   style={styles.btnWrapper}
//                 >
//                   <div style={styles.buyBtn}>{strings.buy}</div>
//                 </Link>
//                 <Link
//                   to={constants.routes.UNDER_CONSTRUCTION}
//                   style={styles.btnWrapper}
//                 >
//                   <div style={styles.financeBtn}>{strings.finance}</div>
//                 </Link>
//               </div>
//             </div>
//             <div style={styles.divider} />
//             <p>{watch.description}</p>
//             <div style={styles.specs}>
//               <div style={styles.properties}>
//                 {caseKey}
//                 {braceletKey}
//                 {dialKey}
//                 {diameterKey}
//                 {movementKey}
//                 {complicationsKey}
//               </div>
//               <div style={styles.values}>
//                 <p>{watch.case}</p>
//                 <p>{watch.bracelet}</p>
//                 <p>{watch.dial}</p>
//                 <p>{watch.diameter}</p>
//                 <p>{watch.movement}</p>
//                 <p>{complications}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div style={styles.others}>
//           {strings.otherWatchesBy}
//           {watch.brand}
//         </div>
//         <div style={styles.bottomWrapper}>
//           {this.state.otherWatches.length > 0
//             ? otherWatches
//             : activityIndicator}
//         </div>
//       </div>
//     );
//   }
// }
