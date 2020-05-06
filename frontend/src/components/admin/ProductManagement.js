import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import constants from "../../constants";
import brands from "../../brands";
import models from "../../models";
import styles from "./styles";
import strings from "./strings";

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
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

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeBrand = (e) => {
    //remove any previously chosen model because it may not be part of the newly chosen brand
    this.setState({ brand: e.value, model: "" });
  };

  onChangeModel = (e) => {
    this.setState({ model: e.value });
  };

  onChangeCase = (e) => {
    this.setState({ case: e.value });
  };

  onChangeBracelet = (e) => {
    this.setState({ bracelet: e.value });
  };

  onChangeDial = (e) => {
    this.setState({ dial: e.value });
  };

  onChangeDiameter = (e) => {
    this.setState({ diameter: e.value });
  };

  onChangeMovement = (e) => {
    this.setState({ movement: e.value });
  };

  onChangeComplications = (e) => {
    this.setState({
      complications: {
        ...this.state.complications,
        [e.target.id]: !this.state.complications[e.target.id],
      },
    });
  };

  onChangeStock = (e) => {
    console.log(this.state.inStock);
    this.setState({ inStock: !this.state.inStock });
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

    return (
      <div style={styles.masterWrapper}>
        <div style={styles.uploadForm}>
          <div style={styles.title}>{strings.uploadNewWatch}</div>
          {/* Brand */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.brand}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={brands}
                onChange={this.onChangeBrand}
                value={this.state.brand}
                id="brand"
                style={styles.dropdown}
              />
            </div>
          </div>
          {/* Model */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.model}</div>
            <div style={styles.dropdown}>
              <Dropdown
                //Removing whitespace from brand name so it can be used as a key for finding models.
                //This dropdown will only show models reletive to the selected brand
                options={models[this.state.brand.replace(/\s/g, "")]}
                onChange={this.onChangeModel}
                value={this.state.model}
                id="model"
                style={styles.dropdown}
              />
            </div>
          </div>
          {/* Case */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.case}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={strings.caseOptions}
                onChange={this.onChangeCase}
                value={this.state.case}
                id="case"
              />
            </div>
          </div>
          {/* Bracelet */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.bracelet}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={strings.braceletOptions}
                onChange={this.onChangeBracelet}
                value={this.state.bracelet}
                id="bracelet"
              />
            </div>
          </div>
          {/* Dial */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.dial}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={strings.dialOptions}
                onChange={this.onChangeDial}
                value={this.state.dial}
                id="dial"
              />
            </div>
          </div>
          {/* Diameter */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.diameter}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={strings.diameterOptions}
                onChange={this.onChangeDiameter}
                value={this.state.diameter}
                id="diameter"
              />
            </div>
          </div>
          {/* Movement */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.movement}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={strings.movementOptions}
                onChange={this.onChangeMovement}
                value={this.state.movement}
                id="movement"
              />
            </div>
          </div>
          {/* Complications */}
          <div style={styles.checkBoxWrapper}>
            <div style={styles.label}>{strings.complications}</div>
            <div style={styles.complicationOptionsWrapper}>
              <div style={styles.complicationRowWrapper}>
                <div style={styles.complicationWrapper}>
                  <div style={styles.complicationLabel}>{strings.date}</div>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complications.date}
                    onChange={this.onChangeComplications}
                    error={errors.complications}
                    id="date"
                    style={styles.complicationCheckbox}
                  />
                </div>
                <div style={styles.complicationWrapper}>
                  <div style={styles.complicationLabel}>
                    {strings.annualCalendar}
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complications.annualCalendar}
                    onChange={this.onChangeComplications}
                    error={errors.complications}
                    id="annualCalendar"
                    style={styles.complicationCheckbox}
                  />
                </div>
              </div>
              <div style={styles.complicationRowWrapper}>
                <div style={styles.complicationWrapper}>
                  <div style={styles.complicationLabel}>
                    {strings.perpetualCalendar}
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complications.perpetualCalendar}
                    onChange={this.onChangeComplications}
                    error={errors.complications}
                    id="perpetualCalendar"
                    style={styles.complicationCheckbox}
                  />
                </div>
                <div style={styles.complicationWrapper}>
                  <div style={styles.complicationLabel}>
                    {strings.chronograph}
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complications.chronograph}
                    onChange={this.onChangeComplications}
                    error={errors.complications}
                    id="chronograph"
                    style={styles.complicationCheckbox}
                  />
                </div>
              </div>
              <div style={styles.complicationRowWrapper}>
                <div style={styles.complicationWrapper}>
                  <div style={styles.complicationLabel}>{strings.gmt}</div>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complications.gmt}
                    onChange={this.onChangeComplications}
                    error={errors.complications}
                    id="gmt"
                    style={styles.complicationCheckbox}
                  />
                </div>
                <div style={styles.complicationWrapper}>
                  <div style={styles.complicationLabel}>
                    {strings.worldTime}
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complications.worldTime}
                    onChange={this.onChangeComplications}
                    error={errors.complications}
                    id="worldTime"
                    style={styles.complicationCheckbox}
                  />
                </div>
              </div>
              <div style={styles.complicationRowWrapper}>
                <div style={styles.complicationWrapper}>
                  <div style={styles.complicationLabel}>
                    {strings.minuteRepeater}
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complications.minuteRepeater}
                    onChange={this.onChangeComplications}
                    error={errors.complications}
                    id="minuteRepeater"
                    style={styles.complicationCheckbox}
                  />
                </div>
                <div style={styles.complicationWrapper}>
                  <div style={styles.complicationLabel}>
                    {strings.moonPhase}
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complications.moonPhase}
                    onChange={this.onChangeComplications}
                    error={errors.complications}
                    id="moonPhase"
                    style={styles.complicationCheckbox}
                  />
                </div>
              </div>
              <div style={styles.complicationRowWrapper}>
                <div style={styles.complicationWrapper}>
                  <div style={styles.complicationLabel}>
                    {strings.tourbillon}
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complications.tourbillon}
                    onChange={this.onChangeComplications}
                    error={errors.complications}
                    id="tourbillon"
                    style={styles.complicationCheckbox}
                  />
                </div>
                <div style={styles.complicationWrapper}>
                  <div style={styles.complicationLabel}>
                    {strings.powerReserve}
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complications.powerReserve}
                    onChange={this.onChangeComplications}
                    error={errors.complications}
                    id="powerReserve"
                    style={styles.complicationCheckbox}
                  />
                </div>
              </div>
            </div>
            <span>{errors.complications}</span>
          </div>
          {/* TODO get rid of the form. Everything is stored in state so shouldn't need it. Just call onSubmit on button click */}
          <form
            action="/upload"
            method="POST"
            encType="multipart/form-data"
            onSubmit={this.onSubmit}
          >
            {/* Price */}
            <div style={styles.dropdownWrapper}>
              <div style={styles.label}>{strings.price}</div>$
              <input
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChangeStock}
                error={errors.inStock}
                id="inStock"
              />
              <span>{errors.inStock}</span>
            </div>
            {/* Image */}
            <div style={styles.dropdownWrapper}>
              <div style={styles.label}>{strings.image}</div>
              <input
                onChange={this.onChangeImage}
                type="file"
                className="file"
                id="image"
              />
            </div>
            <div style={styles.dropdownWrapper}>
              <div style={styles.submitWrapper}>
                <button type="submit" style={styles.submitBtn}>
                  {strings.submit}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
