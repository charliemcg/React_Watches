import React, { Component } from "react";
import axios from "axios";

export default class Rolex extends Component {
  constructor() {
    super();
    this.state = {
      watches: [],
    };
  }
  componentDidMount() {
    axios
      .get("/api/watches/" + "Rolex")
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
        <p>Rolex</p>
        {watches}
      </div>
    );
  }
}
