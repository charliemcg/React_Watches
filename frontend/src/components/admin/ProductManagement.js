import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import constants from "../../constants";
import brands from "../../brands";
import models from "../../models";
import "./styles/styles.css";
import strings from "./strings";

function Admin(props) {
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
    props.auth.user.admin
      ? toggleAdmin(true)
      : (window.location.href = constants.routes.FOUR_OH_FOUR);
  }, [props.auth.user.admin]);

  const handleChange = (e) => {
    switch (e.id) {
      case "brand":
        setBrand(e.value);
        //remove any previously chosen model because it may not be part of the newly chosen brand
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
      default:
        return null;
    }
  };

  const onChangeImage = (e) => {
    //converting image to base64
    var file = e.target.files[0],
      reader = new FileReader();
    reader.onloadend = () => {
      var b64 = reader.result.replace(/^data:.+;base64,/, "");
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
    const createThisWatch = {
      query: `
        mutation { 
          createWatch(watchInput: {
            brand: "${brand}" ,
            model: "${model}",
            housing: "${housing}",
            bracelet: "${bracelet}",
            dial: "${dial}",
            diameter: "${diameter}",
            movement: "${movement}",
            price: "${price}",
            description: "${description}",
            inStock: ${inStock},
            image: "${image}"
          }){
            success
            errors {
              brand
              model
              housing
              bracelet
              dial
              diameter
              movement
              price
              description
              image
            }
          }
        }
      `,
    };
    axios({
      url: "/graphql",
      method: "post",
      data: JSON.stringify(createThisWatch),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const { success, errors } = res.data.data.createWatch;
        if (!success) {
          throw new Error(JSON.stringify(errors));
        }
        setBrand(brands[0]);
        setModel("");
        setHousing("");
        setBracelet("");
        setDial("");
        setDiameter("");
        setMovement("");
        //Setting all the complications to false doesn't uncheck them in the UI.
        //Iterating through them and clicking them to be unchecked.
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
        for (const comp in clickThese)
          complications[comp] && document.getElementById(comp).click();
        setPrice("");
        setDescription("");
        toggleStock(true);
        setImage(null);
        setErrors({});
        //Inform user that upload was successful
      })
      .catch((err) => {
        console.log(`Cannot create watch ${err}`);
        //TODO Display errors to user
        //     dispatch({
        //       type: GET_ERRORS,
        //       payload: err.response.data,
        //     })
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
      default:
        console.log("Could not find option");
        return null;
    }
  };

  const getDropdown = (watchAttribute) => {
    return (
      <div className="admin-dropdown-wrapper">
        <div className="admin-label">{strings[watchAttribute]}</div>
        <div id="dropdown">
          <Dropdown
            options={getOptions(watchAttribute)}
            onChange={(val) => {
              handleChange({ value: val.value, id: watchAttribute });
            }}
            value={eval(watchAttribute)}
          />
        </div>
      </div>
    );
  };

  const getComplication = (comp) => {
    return (
      <div id="complication-wrapper">
        <label htmlFor={comp} id="complication-label">
          {strings[comp]}
        </label>
        <input
          type="checkbox"
          id={comp}
          onChange={(val) => {
            handleChange({ value: comp, id: "complications" });
          }}
          error={errors.complications}
        />
      </div>
    );
  };

  return isAdmin ? (
    <div id="master-admin-wrapper">
      <div id="upload-form">
        <div id="title">{strings.uploadNewWatch}</div>
        {/* Brand */}
        {getDropdown("brand")}
        {getDropdown("model")}
        {getDropdown("housing")}
        {getDropdown("bracelet")}
        {getDropdown("dial")}
        {getDropdown("diameter")}
        {getDropdown("movement")}
        {/* Complications */}
        <div className="admin-checkbox-wrapper">
          <div className="admin-label">{strings.complications}</div>
          <div id="complication-options-wrapper">
            <div className="admin-complication-row-wrapper">
              {getComplication("date")}
              {getComplication("annualCalendar")}
            </div>
            <div className="admin-complication-row-wrapper">
              {getComplication("perpetualCalendar")}
              {getComplication("chronograph")}
            </div>
            <div className="admin-complication-row-wrapper">
              {getComplication("gmt")}
              {getComplication("worldTime")}
            </div>
            <div className="admin-complication-row-wrapper">
              {getComplication("minuteRepeater")}
              {getComplication("moonPhase")}
            </div>
            <div className="admin-complication-row-wrapper">
              {getComplication("tourbillon")}
              {getComplication("powerReserve")}
            </div>
          </div>
          <span>{errors.complications}</span>
        </div>
        {/* Price */}
        <div className="admin-dropdown-wrapper">
          <div className="admin-label">{strings.price}</div>
          $
          <input
            ref={priceRef}
            onChange={() => {
              handleChange({ value: priceRef.current.value, id: "price" });
            }}
            value={price}
            error={errors.price}
            id="price"
          />
          <span>{errors.price}</span>
        </div>
        {/* Description */}
        <div className="admin-dropdown-wrapper">
          <div className="admin-label">{strings.description}</div>
          <textarea
            ref={descriptionRef}
            onChange={() => {
              handleChange({
                value: descriptionRef.current.value,
                id: "description",
              });
            }}
            value={description}
            error={errors.description}
            id="description"
          />
          <span>{errors.description}</span>
        </div>
        {/* In stock */}
        <div className="admin-checkbox-wrapper">
          <div className="label">{strings.inStock}</div>
          <input
            type="checkbox"
            defaultChecked={inStock}
            onChange={() => {
              handleChange({ value: null, id: "inStock" });
            }}
            error={errors.inStock}
          />
          <span>{errors.inStock}</span>
        </div>
        {/* Image */}
        <div className="admin-dropdown-wrapper">
          <div className="admin-label">{strings.image}</div>
          <input onChange={onChangeImage} type="file" className="file" />
        </div>
        <div className="admin-dropdown-wrapper">
          <div id="submit-wrapper">
            <button type="submit" id="submit-btn" onClick={onSubmit}>
              {strings.submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Admin);
