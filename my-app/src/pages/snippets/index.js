import React, { Component } from "react";
import { Route } from "react-router-dom";

import snippetsvba from "./vba";
import snippetsreactjs from "./reactjs";

class snippets extends Component {
  render() {
    return (
      <div>
        <Route path="/snippets/vba/:cat" component={snippetsvba} />
        <Route path="/snippets/reactjs/:cat" component={snippetsreactjs} />
      </div>
    );
  }
}

export default snippets;
