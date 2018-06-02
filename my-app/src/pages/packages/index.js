import React, { Component } from "react";
import { Route } from "react-router-dom";

import packagesreactjs from "./reactjs";

class packages extends Component {
  render() {
    return (
      <div>
        <Route path="/packages/reactjs/:cat" component={packagesreactjs} />
      </div>
    );
  }
}

export default packages;
