import React, { Component } from "react";
import Loadable from "react-loadable";
import Sidenav from "../../commons/sidenav";
import navlist from "./navlist";

export default class snippetsreactjs extends Component {
  componentDidMount() {}
  render() {
    const { cat } = this.props.match.params;
    const LoadableComponent = Loadable({
      loader: () => import("./contents/" + cat),
      loading: "Loading"
    });

    return (
      <div className="container-fluid">
        <div className="row p-3">
          <div className="d-none d-md-block col-md-2">
            <Sidenav cat={cat} navlist={navlist} logo="reactjs.png" />
          </div>
          <div className="col-md-9 col-sm-12 p-5">
            <LoadableComponent />
          </div>
        </div>
      </div>
    );
  }
}
