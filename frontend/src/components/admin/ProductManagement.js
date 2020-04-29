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
      complications: "",
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
    const newWatch = {
      brand: this.state.brand,
      model: this.state.model,
      price: this.state.price,
      description: this.state.description,
      inStock: this.state.inStock,
      image: this.state.image,
    };
    console.log(newWatch);
    axios
      .post(`${constants.api.WATCHES}${constants.api.NEW_WATCH}`, newWatch)
      .then((res) => {
        console.log(`Watch posted successfully`);
        this.setState({
          brand: brands[0],
          model: "",
          price: "",
          description: "",
          inStock: "",
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
      <div>
        {/* Brand */}
        <div>
          <Dropdown
            options={brands}
            onChange={this.onChangeBrand}
            value={this.state.brand}
            id="brand"
          />
          {strings.brand}
        </div>
        {/* Model */}
        <div>
          <Dropdown
            //Removing whitespace from brand name so it can be used as a key for finding models.
            //This dropdown will only show models reletive to the selected brand
            options={models[this.state.brand.replace(/\s/g, "")]}
            onChange={this.onChangeModel}
            value={this.state.model}
            id="model"
          />
          {strings.model}
        </div>
        {/* Case */}
        <div>
          <Dropdown
            options={strings.caseOptions}
            onChange={this.onChangeCase}
            value={this.state.case}
            id="case"
          />
          {strings.case}
        </div>
        {/* Bracelet */}
        <div>
          <Dropdown
            options={strings.braceletOptions}
            onChange={this.onChangeBracelet}
            value={this.state.bracelet}
            id="bracelet"
          />
          {strings.bracelet}
        </div>
        {/* Dial */}
        <div>
          <Dropdown
            options={strings.dialOptions}
            onChange={this.onChangeDial}
            value={this.state.dial}
            id="dial"
          />
          {strings.dial}
        </div>
        {/* Diameter */}
        <div>
          <Dropdown
            options={strings.diameterOptions}
            onChange={this.onChangeDiameter}
            value={this.state.diameter}
            id="diameter"
          />
          {strings.diameter}
        </div>
        {/* Movement */}
        <div>
          <Dropdown
            options={strings.movementOptions}
            onChange={this.onChangeMovement}
            value={this.state.movement}
            id="movement"
          />
          {strings.movement}
        </div>
        <form
          action="/upload"
          method="POST"
          encType="multipart/form-data"
          onSubmit={this.onSubmit}
        >
          {/* Price */}
          <div>
            <input
              onChange={this.onChange}
              value={this.state.price}
              error={errors.price}
              id="price"
            />
            <label htmlFor="price">{strings.price}</label>
            <span>{errors.price}</span>
          </div>
          {/* Description */}
          <div>
            <input
              onChange={this.onChange}
              value={this.state.description}
              error={errors.description}
              id="description"
            />
            <label htmlFor="description">{strings.description}</label>
            <span>{errors.description}</span>
          </div>
          {/* In stock */}
          <div>
            <input
              type="checkbox"
              defaultChecked={this.state.inStock}
              onChange={this.onChangeStock}
              error={errors.inStock}
              id="inStock"
            />
            <label htmlFor="inStock">{strings.inStock}</label>
            <span>{errors.inStock}</span>
          </div>
          {/* Image */}
          <input
            onChange={this.onChangeImage}
            type="file"
            className="file"
            id="image"
          />
          <label htmlFor="file">{strings.image}</label>
          <div>
            <button type="submit">{strings.submit}</button>
          </div>
        </form>
      </div>
    );
  }
}
