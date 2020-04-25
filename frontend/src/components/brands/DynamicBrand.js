import React, { Component } from "react";
import axios from "axios";
import constants from "../../constants";

export default class Cartier extends Component {
  constructor() {
    super();
    this.state = {
      watches: [],
    };
  }
  componentDidMount() {
    axios
      .get(constants.api.WATCHES + this.props.match.params.brand)
      .then((res) => {
        this.setState({ watches: res.data });
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
    const watches = this.state.watches.map((watch) => {
      return <p>{watch.model}</p>;
    });
    return (
      <div>
        <p>{this.props.match.params.brand}</p>
        {watches}
      </div>
    );
  }
}