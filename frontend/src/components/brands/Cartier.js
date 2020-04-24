import React, { Component } from "react";
import axios from "axios";

export default class Cartier extends Component {
  constructor() {
    super();
    this.state = {
      watches: [],
    };
  }
  componentDidMount() {
    axios
      .get("/api/watches/" + "Cartier")
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
        <p>Cartier</p>
        {watches}
      </div>
    );
  }
}
