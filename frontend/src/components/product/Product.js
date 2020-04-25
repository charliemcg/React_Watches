import React, { Component } from "react";
import axios from "axios";
import constants from "../../constants";

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      watch: {},
    };
  }
  componentDidMount() {
    const { params } = this.props.match;
    axios
      .get(`${constants.api.WATCHES}/${params.brand}/${params.model}`)
      .then((res) => {
        this.setState({ watch: res.data });
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data,
        // });
      });
  }
  render() {
    const { watch } = this.state;
    return (
      <div>
        <p>{watch.brand}</p>
        <p>{watch.model}</p>
        <p>${watch.price}</p>
        <p>{watch.description}</p>
      </div>
    );
  }
}
