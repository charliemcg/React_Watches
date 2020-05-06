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

    return (
      <div style={styles.masterWrapper}>
        <div
          style={{ backgroundColor: "pink" }}
          onClick={() => console.log(this.state)}
        >
          Check state
        </div>
        <div style={styles.uploadForm}>
          <div style={styles.title}>{strings.uploadNewWatch}</div>
          {/* Brand */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.brand}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={brands}
                onChange={(val) => {
                  this.handleChange({ value: val.value, id: "brand" });
                }}
                value={this.state.brand}
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
                onChange={(val) => {
                  this.handleChange({ value: val.value, id: "model" });
                }}
                value={this.state.model}
              />
            </div>
          </div>
          {/* Case */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.case}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={strings.caseOptions}
                onChange={(val) => {
                  this.handleChange({ value: val.value, id: "case" });
                }}
                value={this.state.case}
              />
            </div>
          </div>
          {/* Bracelet */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.bracelet}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={strings.braceletOptions}
                onChange={(val) => {
                  this.handleChange({
                    value: val.value,
                    id: "bracelet",
                  });
                }}
                value={this.state.bracelet}
              />
            </div>
          </div>
          {/* Dial */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.dial}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={strings.dialOptions}
                onChange={(val) => {
                  this.handleChange({ value: val.value, id: "dial" });
                }}
                value={this.state.dial}
              />
            </div>
          </div>
          {/* Diameter */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.diameter}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={strings.diameterOptions}
                onChange={(val) => {
                  this.handleChange({
                    value: val.value,
                    id: "diameter",
                  });
                }}
                value={this.state.diameter}
              />
            </div>
          </div>
          {/* Movement */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.label}>{strings.movement}</div>
            <div style={styles.dropdown}>
              <Dropdown
                options={strings.movementOptions}
                onChange={(val) => {
                  this.handleChange({
                    value: val.value,
                    id: "movement",
                  });
                }}
                value={this.state.movement}
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
                    onChange={() => {
                      this.handleComplicationChange({
                        value: !this.state.complications.date,
                        id: "date",
                      });
                    }}
                    error={errors.complications}
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
                    onChange={() => {
                      this.handleComplicationChange({
                        value: !this.state.complications.annualCalendar,
                        id: "annualCalendar",
                      });
                    }}
                    error={errors.complications}
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
                    onChange={() => {
                      this.handleComplicationChange({
                        value: !this.state.complications.perpetualCalendar,
                        id: "perpetualCalendar",
                      });
                    }}
                    error={errors.complications}
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
                    onChange={() => {
                      this.handleComplicationChange({
                        value: !this.state.complications.chronograph,
                        id: "chronograph",
                      });
                    }}
                    error={errors.complications}
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
                    onChange={() => {
                      this.handleComplicationChange({
                        value: !this.state.complications.gmt,
                        id: "gmt",
                      });
                    }}
                    error={errors.complications}
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
                    onChange={() => {
                      this.handleComplicationChange({
                        value: !this.state.complications.worldTime,
                        id: "worldTime",
                      });
                    }}
                    error={errors.complications}
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
                    onChange={() => {
                      this.handleComplicationChange({
                        value: !this.state.complications.minuteRepeater,
                        id: "minuteRepeater",
                      });
                    }}
                    error={errors.complications}
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
                    onChange={() => {
                      this.handleComplicationChange({
                        value: !this.state.complications.moonPhase,
                        id: "moonPhase",
                      });
                    }}
                    error={errors.complications}
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
                    onChange={() => {
                      this.handleComplicationChange({
                        value: !this.state.complications.tourbillon,
                        id: "tourbillon",
                      });
                    }}
                    error={errors.complications}
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
                    onChange={() => {
                      this.handleComplicationChange({
                        value: !this.state.complications.powerReserve,
                        id: "powerReserve",
                      });
                    }}
                    error={errors.complications}
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
              <input
                onChange={this.onChangeImage}
                type="file"
                className="file"
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
