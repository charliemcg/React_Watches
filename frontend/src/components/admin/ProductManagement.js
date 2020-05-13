import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useReducer,
} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import constants from "../../constants";
import brands from "../../brands";
import models from "../../models";
import styles from "./styles";
import strings from "./strings";

// class Admin extends Component {
//   constructor() {
//     super();
//     this.state = {
//       //only allow admins to access this page
//       isAdmin: false,
//       //default to Rolex
//       brand: brands[0],
//       model: "",
//       case: "",
//       bracelet: "",
//       dial: "",
//       diameter: "",
//       movement: "",
//       complications: {
//         date: false,
//         annualCalendar: false,
//         perpetualCalendar: false,
//         chronograph: false,
//         gmt: false,
//         worldTime: false,
//         minuteRepeater: false,
//         moonPhase: false,
//         tourbillon: false,
//         powerReserve: false,
//       },
//       price: "",
//       description: "",
//       inStock: true,
//       image: null,
//       errors: {},
//     };
//   }

//   componentWillMount() {
//     this.props.auth.user.admin
//       ? this.setState({ isAdmin: true })
//       : (window.location.href = constants.routes.FOUR_OH_FOUR);
//   }

//   handleInputChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//   };

//   handleChange = (e) => {
//     this.setState({ [e.id]: e.value });
//     //remove any previously chosen model because it may not be part of the newly chosen brand
//     e.id === "brand" && this.setState({ model: "" });
//   };

//   handleComplicationChange = (e) => {
//     this.setState({
//       complications: {
//         ...this.state.complications,
//         [e.id]: e.value,
//       },
//     });
//   };

//   onChangeImage = (e) => {
//     //converting image to base64
//     var file = e.target.files[0],
//       reader = new FileReader();
//     reader.onloadend = () => {
//       var b64 = reader.result.replace(/^data:.+;base64,/, "");
//       this.setState({ image: b64 });
//     };
//     reader.readAsDataURL(file);
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     const complications = [];
//     for (let [key, value] of Object.entries(this.state.complications)) {
//       value && complications.push(strings[key]);
//     }
//     const newWatch = {
//       brand: this.state.brand,
//       model: this.state.model,
//       //cannot use 'case' in the backend because it's a keyword. Using 'housing' instead
//       housing: this.state.case,
//       bracelet: this.state.bracelet,
//       dial: this.state.dial,
//       diameter: this.state.diameter,
//       movement: this.state.movement,
//       complications,
//       price: this.state.price,
//       description: this.state.description,
//       inStock: this.state.inStock,
//       image: this.state.image,
//     };
//     axios
//       .post(`${constants.api.WATCHES}${constants.api.NEW_WATCH}`, newWatch)
//       .then((res) => {
//         console.log(`Watch posted successfully`);
//         this.setState({
//           brand: brands[0],
//           model: "",
//           case: "",
//           bracelet: "",
//           dial: "",
//           diameter: "",
//           movement: "",
//           complications: {
//             date: false,
//             annualCalendar: false,
//             perpetualCalendar: false,
//             chronograph: false,
//             gmt: false,
//             worldTime: false,
//             minuteRepeater: false,
//             moonPhase: false,
//             tourbillon: false,
//             powerReserve: false,
//           },
//           price: "",
//           description: "",
//           inStock: true,
//           image: null,
//           errors: {},
//         });
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
//     const { errors } = this.state;

//     let getOptions = (val) => {
//       switch (val) {
//         case "brand":
//           return brands;
//         case "model":
//           return models[this.state.brand.replace(/\s/g, "")];
//         case "case":
//           return strings.caseOptions;
//         case "bracelet":
//           return strings.braceletOptions;
//         case "dial":
//           return strings.dialOptions;
//         case "diameter":
//           return strings.diameterOptions;
//         case "movement":
//           return strings.movementOptions;
//       }
//     };

//     const getDropdown = (watchAttribute) => {
//       return (
//         <div style={styles.dropdownWrapper}>
//           <div style={styles.label}>{strings[watchAttribute]}</div>
//           <div style={styles.dropdown}>
//             <Dropdown
//               options={getOptions(watchAttribute)}
//               onChange={(val) => {
//                 this.handleChange({ value: val.value, id: watchAttribute });
//               }}
//               value={this.state[watchAttribute]}
//             />
//           </div>
//         </div>
//       );
//     };

//     const getComplication = (comp) => {
//       return (
//         <div style={styles.complicationWrapper}>
//           <label htmlFor={comp} style={styles.complicationLabel}>
//             {strings[comp]}
//           </label>
//           <input
//             type="checkbox"
//             id={comp}
//             defaultChecked={this.state.complications[comp]}
//             onChange={() => {
//               this.handleComplicationChange({
//                 value: !this.state.complications[comp],
//                 id: comp,
//               });
//             }}
//             error={errors.complications}
//             style={styles.complicationCheckbox}
//           />
//         </div>
//       );
//     };

//     return this.state.isAdmin ? (
//       <div style={styles.masterWrapper}>
//         <div style={styles.uploadForm}>
//           <div style={styles.title}>{strings.uploadNewWatch}</div>
//           {/* Brand */}
//           {getDropdown("brand")}
//           {getDropdown("model")}
//           {getDropdown("case")}
//           {getDropdown("bracelet")}
//           {getDropdown("dial")}
//           {getDropdown("diameter")}
//           {getDropdown("movement")}
//           {/* Complications */}
//           <div style={styles.checkBoxWrapper}>
//             <div style={styles.label}>{strings.complications}</div>
//             <div style={styles.complicationOptionsWrapper}>
//               <div style={styles.complicationRowWrapper}>
//                 {getComplication("date")}
//                 {getComplication("annualCalendar")}
//               </div>
//               <div style={styles.complicationRowWrapper}>
//                 {getComplication("perpetualCalendar")}
//                 {getComplication("chronograph")}
//               </div>
//               <div style={styles.complicationRowWrapper}>
//                 {getComplication("gmt")}
//                 {getComplication("worldTime")}
//               </div>
//               <div style={styles.complicationRowWrapper}>
//                 {getComplication("minuteRepeater")}
//                 {getComplication("moonPhase")}
//               </div>
//               <div style={styles.complicationRowWrapper}>
//                 {getComplication("tourbillon")}
//                 {getComplication("powerReserve")}
//               </div>
//             </div>
//             <span>{errors.complications}</span>
//           </div>
//           {/* Price */}
//           <div style={styles.dropdownWrapper}>
//             <div style={styles.label}>{strings.price}</div>$
//             <input
//               onChange={this.handleInputChange}
//               value={this.state.price}
//               error={errors.price}
//               id="price"
//             />
//             <span>{errors.price}</span>
//           </div>
//           {/* Description */}
//           <div style={styles.dropdownWrapper}>
//             <div style={styles.label}>{strings.description}</div>
//             <textarea
//               onChange={this.handleInputChange}
//               value={this.state.description}
//               error={errors.description}
//               id="description"
//               style={styles.description}
//             />
//             <span>{errors.description}</span>
//           </div>
//           {/* In stock */}
//           <div style={styles.checkBoxWrapper}>
//             <div style={styles.label}>{strings.inStock}</div>
//             <input
//               type="checkbox"
//               defaultChecked={this.state.inStock}
//               onChange={() => {
//                 this.handleChange({
//                   value: !this.state.inStock,
//                   id: "inStock",
//                 });
//               }}
//               error={errors.inStock}
//             />
//             <span>{errors.inStock}</span>
//           </div>
//           {/* Image */}
//           <div style={styles.dropdownWrapper}>
//             <div style={styles.label}>{strings.image}</div>
//             <input onChange={this.onChangeImage} type="file" className="file" />
//           </div>
//           <div style={styles.dropdownWrapper}>
//             <div style={styles.submitWrapper}>
//               <button
//                 type="submit"
//                 style={styles.submitBtn}
//                 onClick={this.onSubmit}
//               >
//                 {strings.submit}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ) : null;
//   }
// }
// Admin.propTypes = {
//   auth: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });
// export default connect(mapStateToProps, null)(Admin);

function Admin() {
  const priceRef = useRef();
  const descriptionRef = useRef();
  const [isAdmin, toggleAdmin] = useState(false);
  const [brand, setBrand] = useState(brands[0]);
  const [model, setModel] = useState("");
  //cannot use variable name 'case' because it's a keyword. Using 'housing' instead
  const [housing, setHousing] = useState("");
  const [bracelet, setBracelet] = useState("");
  const [dial, setDial] = useState("");
  const [diameter, setDiameter] = useState("");
  const [movement, setMovement] = useState("");
  const [complications, setComplications] = useState({
    date: false,
    annualCalendar: false,
    perpetualCalendar: false,
    chronograph: false,
    gmt: false,
    worldTime: false,
    minuteRepeater: false,
    moonPhase: false,
    tourbillon: false,
    powerReserve: false,
  });
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, toggleStock] = useState(true);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    //   this.props.auth.user.admin
    //     ? this.setState({ isAdmin: true })
    //     : (window.location.href = constants.routes.FOUR_OH_FOUR);
  });

  // const handleInputChange = (e) => {
  //   console.log("Changing input");
  //   // this.setState({ [e.target.id]: e.target.value });
  // };

  const handleChange = (e) => {
    // console.log(eval(e.id));
    switch (e.id) {
      case "brand":
        setBrand(e.value);
        setModel("");
        break;
      case "model":
        setModel(e.value);
        break;
      case "housing":
        setHousing(e.value);
        break;
      case "bracelet":
        setBracelet(e.value);
        break;
      case "dial":
        setDial(e.value);
        break;
      case "diameter":
        setDiameter(e.value);
        break;
      case "movement":
        setMovement(e.value);
        break;
      case "complications":
        setComplications({
          ...complications,
          [e.value]: !complications[e.value],
        });
        break;
      case "price":
        setPrice(e.value);
        break;
      case "description":
        setDescription(e.value);
        break;
      case "inStock":
        toggleStock(!inStock);
        break;
    }
    // this.setState({ [e.id]: e.value });
    //remove any previously chosen model because it may not be part of the newly chosen brand
    // e.id === "brand" && this.setState({ model: "" });
  };

  // const handleComplicationChange = (e) => {
  //   // this.setState({
  //   //   complications: {
  //   //     ...this.state.complications,
  //   //     [e.id]: e.value,
  //   //   },
  //   // });
  // };

  const onChangeImage = (e) => {
    //converting image to base64
    var file = e.target.files[0],
      reader = new FileReader();
    reader.onloadend = () => {
      var b64 = reader.result.replace(/^data:.+;base64,/, "");
      // this.setState({ image: b64 });
      setImage(b64);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const complicationsArr = [];
    for (let [key, value] of Object.entries(complications)) {
      value && complicationsArr.push(strings[key]);
    }
    const newWatch = {
      //   brand: this.state.brand,
      //   model: this.state.model,
      //   //cannot use 'case' in the backend because it's a keyword. Using 'housing' instead
      //   housing: this.state.case,
      //   bracelet: this.state.bracelet,
      //   dial: this.state.dial,
      //   diameter: this.state.diameter,
      //   movement: this.state.movement,
      //   complications,
      //   price: this.state.price,
      //   description: this.state.description,
      //   inStock: this.state.inStock,
      //   image: this.state.image,
      brand,
      model,
      //cannot use 'case' in the backend because it's a keyword. Using 'housing' instead
      housing,
      bracelet,
      dial,
      diameter,
      movement,
      complications,
      price,
      description,
      inStock,
      image,
    };
    axios
      .post(`${constants.api.WATCHES}${constants.api.NEW_WATCH}`, newWatch)
      .then((res) => {
        console.log(`Watch posted successfully`);
        setBrand(brands[0]);
        setModel("");
        setHousing("");
        setBracelet("");
        setDial("");
        setDiameter("");
        setMovement("");
        ////////////
        const clickThese = [
          "date",
          "annualCalendar",
          "perpetualCalendar",
          "chronograph",
          "gmt",
          "worldTime",
          "minuteRepeater",
          "moonPhase",
          "tourbillon",
          "powerReserve",
        ];
        clickThese.map((e) => {
          complications[e] && document.getElementById(e).click();
        });
        // document.getElementById("date").click();
        // setComplications({
        //   date: false,
        //   annualCalendar: false,
        //   perpetualCalendar: false,
        //   chronograph: false,
        //   gmt: false,
        //   worldTime: false,
        //   minuteRepeater: false,
        //   moonPhase: false,
        //   tourbillon: false,
        //   powerReserve: false,
        // });
        setPrice("");
        setDescription("");
        toggleStock(true);
        setImage(null);
        setErrors({});
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data,
        // });
      });
  };

  let getOptions = (val) => {
    switch (val) {
      case "brand":
        return brands;
      case "model":
        return models[brand.replace(/\s/g, "")];
      case "housing":
        return strings.housingOptions;
      case "bracelet":
        return strings.braceletOptions;
      case "dial":
        return strings.dialOptions;
      case "diameter":
        return strings.diameterOptions;
      case "movement":
        return strings.movementOptions;
    }
  };

  const getDropdown = (watchAttribute) => {
    return (
      <div style={styles.dropdownWrapper}>
        <div style={styles.label}>{strings[watchAttribute]}</div>
        <div style={styles.dropdown}>
          <Dropdown
            options={getOptions(watchAttribute)}
            onChange={(val) => {
              handleChange({ value: val.value, id: watchAttribute });
            }}
            value={eval(watchAttribute)}
            // value={watchAttribute === "brand" && brand}
          />
        </div>
      </div>
    );
  };

  const getComplication = (comp) => {
    return (
      <div style={styles.complicationWrapper}>
        <label htmlFor={comp} style={styles.complicationLabel}>
          {strings[comp]}
        </label>
        <input
          type="checkbox"
          id={comp}
          // defaultChecked={this.state.complications[comp]}
          // onChange={() => {
          //   this.handleComplicationChange({
          //     // value: !this.state.complications[comp],
          //     id: comp,
          //   });
          // }}
          onChange={(val) => {
            handleChange({ value: comp, id: "complications" });
          }}
          error={errors.complications}
          style={styles.complicationCheckbox}
        />
      </div>
    );
  };

  // return isAdmin ? (
  return (
    <div style={styles.masterWrapper}>
      <div style={styles.uploadForm}>
        <div style={styles.title}>{strings.uploadNewWatch}</div>
        {/* Brand */}
        {getDropdown("brand")}
        {getDropdown("model")}
        {getDropdown("housing")}
        {getDropdown("bracelet")}
        {getDropdown("dial")}
        {getDropdown("diameter")}
        {getDropdown("movement")}
        {/* Complications */}
        <div style={styles.checkBoxWrapper}>
          <div style={styles.label}>{strings.complications}</div>
          <div style={styles.complicationOptionsWrapper}>
            <div style={styles.complicationRowWrapper}>
              {getComplication("date")}
              {getComplication("annualCalendar")}
            </div>
            <div style={styles.complicationRowWrapper}>
              {getComplication("perpetualCalendar")}
              {getComplication("chronograph")}
            </div>
            <div style={styles.complicationRowWrapper}>
              {getComplication("gmt")}
              {getComplication("worldTime")}
            </div>
            <div style={styles.complicationRowWrapper}>
              {getComplication("minuteRepeater")}
              {getComplication("moonPhase")}
            </div>
            <div style={styles.complicationRowWrapper}>
              {getComplication("tourbillon")}
              {getComplication("powerReserve")}
            </div>
          </div>
          <span>{errors.complications}</span>
        </div>
        {/* Price */}
        <div style={styles.dropdownWrapper}>
          <div style={styles.label}>{strings.price}</div>$
          <input
            ref={priceRef}
            // onChange={handleInputChange}
            onChange={() => {
              // console.log(priceRef.current.value);
              handleChange({ value: priceRef.current.value, id: "price" });
            }}
            value={price}
            error={errors.price}
            id="price"
          />
          <span>{errors.price}</span>
        </div>
        {/* Description */}
        <div style={styles.dropdownWrapper}>
          <div style={styles.label}>{strings.description}</div>
          <textarea
            ref={descriptionRef}
            // onChange={handleInputChange}
            onChange={() => {
              handleChange({
                value: descriptionRef.current.value,
                id: "description",
              });
            }}
            value={description}
            error={errors.description}
            id="description"
            style={styles.description}
          />
          <span>{errors.description}</span>
        </div>
        {/* In stock */}
        <div style={styles.checkBoxWrapper}>
          <div style={styles.label}>{strings.inStock}</div>
          <input
            type="checkbox"
            defaultChecked={inStock}
            // onChange={() => {
            //   this.handleChange({
            //     value: !this.state.inStock,
            //     id: "inStock",
            //   });
            // }}
            onChange={() => {
              handleChange({ value: null, id: "inStock" });
            }}
            error={errors.inStock}
          />
          <span>{errors.inStock}</span>
        </div>
        {/* Image */}
        <div style={styles.dropdownWrapper}>
          <div style={styles.label}>{strings.image}</div>
          <input onChange={onChangeImage} type="file" className="file" />
        </div>
        <div style={styles.dropdownWrapper}>
          <div style={styles.submitWrapper}>
            <button type="submit" style={styles.submitBtn} onClick={onSubmit}>
              {strings.submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  // ) : null;
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Admin);
