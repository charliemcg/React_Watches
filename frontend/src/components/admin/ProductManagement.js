import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import constants from "../../constants";
import brands from "../../brands";
import models from "../../models";

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      brand: brands[0],
      model: "",
      price: "",
      description: "",
      inStock: "",
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
    axios
      .post(`${constants.api.WATCHES}${constants.api.NEW_WATCH}`, newWatch)
      .then((res) => {
        console.log(`Watch posted successfully`);
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
        <div>
          <Dropdown
            options={brands}
            onChange={this.onChangeBrand}
            value={this.state.brand}
            id="brand"
          />
          Brand
        </div>
        <div>
          <Dropdown
            //Removing whitespace from brand name so it can be used as a key for finding models.
            //This dropdown will only show models reletive to the selected brand
            options={models[this.state.brand.replace(/\s/g, "")]}
            onChange={this.onChangeModel}
            value={this.state.model}
            id="model"
          />
          Model
        </div>
        <form
          action="/upload"
          method="POST"
          encType="multipart/form-data"
          onSubmit={this.onSubmit}
        >
          <div>
            <input
              onChange={this.onChange}
              value={this.state.price}
              error={errors.price}
              id="price"
              type="price"
            />
            <label htmlFor="price">Price</label>
            <span>{errors.price}</span>
          </div>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.description}
              error={errors.description}
              id="description"
              type="description"
            />
            <label htmlFor="description">Description</label>
            <span>{errors.description}</span>
          </div>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.inStock}
              error={errors.inStock}
              id="inStock"
              type="inStock"
            />
            <label htmlFor="inStock">In Stock</label>
            <span>{errors.inStock}</span>
          </div>
          <input
            onChange={this.onChangeImage}
            type="file"
            className="file"
            id="image"
          />

          <label htmlFor="file">Image</label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
