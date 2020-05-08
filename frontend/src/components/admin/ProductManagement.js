import React, { Component } from "react";
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

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      //only allow admins to access this page
      isAdmin: false,
      //default to Rolex
      brand: brands[0],
      model: "",
      case: "",
      bracelet: "",
      dial: "",
      diameter: "",
      movement: "",
      complications: {
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
      },
      price: "",
      description: "",
      inStock: true,
      image: null,
      errors: {},
    };
  }

  componentWillMount() {
    this.props.auth.user.admin
      ? this.setState({ isAdmin: true })
      : (window.location.href = constants.routes.FOUR_OH_FOUR);
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChange = (e) => {
    this.setState({ [e.id]: e.value });
    //remove any previously chosen model because it may not be part of the newly chosen brand
    e.id === "brand" && this.setState({ model: "" });
  };

  handleComplicationChange = (e) => {
    this.setState({
      complications: {
        ...this.state.complications,
        [e.id]: e.value,
      },
    });
  };

  onChangeImage = (e) => {
    //converting image to base64
    var file = e.target.files[0],
      reader = new FileReader();
    reader.onloadend = () => {
      var b64 = reader.result.replace(/^data:.+;base64,/, "");
      this.setState({ image: b64 });
    };
    reader.readAsDataURL(file);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const complications = [];
    for (let [key, value] of Object.entries(this.state.complications)) {
      value && complications.push(strings[key]);
    }
    const newWatch = {
      brand: this.state.brand,
      model: this.state.model,
      //cannot use 'case' in the backend because it's a keyword. Using 'housing' instead
      housing: this.state.case,
      bracelet: this.state.bracelet,
      dial: this.state.dial,
      diameter: this.state.diameter,
      movement: this.state.movement,
      complications,
      price: this.state.price,
      description: this.state.description,
      inStock: this.state.inStock,
      image: this.state.image,
    };
    axios
      .post(`${constants.api.WATCHES}${constants.api.NEW_WATCH}`, newWatch)
      .then((res) => {
        console.log(`Watch posted successfully`);
        this.setState({
          brand: brands[0],
          model: "",
          case: "",
          bracelet: "",
          dial: "",
          diameter: "",
          movement: "",
          complications: {
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
          },
          price: "",
          description: "",
          inStock: true,
          image: null,
          errors: {},
        });
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
    const { errors } = this.state;

    let getOptions = (val) => {
      switch (val) {
        case "brand":
          return brands;
        case "model":
          return models[this.state.brand.replace(/\s/g, "")];
        case "case":
          return strings.caseOptions;
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
                this.handleChange({ value: val.value, id: watchAttribute });
              }}
              value={this.state[watchAttribute]}
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
            defaultChecked={this.state.complications[comp]}
            onChange={() => {
              this.handleComplicationChange({
                value: !this.state.complications[comp],
                id: comp,
              });
            }}
            error={errors.complications}
            style={styles.complicationCheckbox}
          />
        </div>
      );
    };

    return this.state.isAdmin ? (
      <div style={styles.masterWrapper}>
        <div style={styles.uploadForm}>
          <div style={styles.title}>{strings.uploadNewWatch}</div>
          {/* Brand */}
          {getDropdown("brand")}
          {getDropdown("model")}
          {getDropdown("case")}
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
              onChange={this.handleInputChange}
              value={this.state.price}
              error={errors.price}
              id="price"
            />
            <span>{errors.price}</span>
          </div>
          {/* Description */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.description}</div>
            <textarea
              onChange={this.handleInputChange}
              value={this.state.description}
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
              defaultChecked={this.state.inStock}
              onChange={() => {
                this.handleChange({
                  value: !this.state.inStock,
                  id: "inStock",
                });
              }}
              error={errors.inStock}
            />
            <span>{errors.inStock}</span>
          </div>
          {/* Image */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.image}</div>
            <input onChange={this.onChangeImage} type="file" className="file" />
          </div>
          <div style={styles.dropdownWrapper}>
            <div style={styles.submitWrapper}>
              <button
                type="submit"
                style={styles.submitBtn}
                onClick={this.onSubmit}
              >
                {strings.submit}
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
Admin.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Admin);
