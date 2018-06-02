import React, { Component } from "react";
import { Route } from "react-router-dom";

import referencesvba from "./vba";

class references extends Component {
  render() {
    return (
      <div>
        <Route path="/references/vba/:cat" component={referencesvba} />
      </div>
    );
  }
}

export default references;
