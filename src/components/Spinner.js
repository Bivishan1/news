import React, { Component } from "react";

export class Spinner extends Component {
  render() {
    let { style = { width: "3rem", height: "3rem" } } = this.props;
    return (
      <div className="text-center">
        <div className="spinner-border" style={style} role="status"></div>
      </div>
    );
  }
}

export default Spinner;
