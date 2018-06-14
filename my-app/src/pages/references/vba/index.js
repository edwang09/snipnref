import React, { Component } from "react";
import Loadable from "react-loadable";
import Sidenav from "../../commons/sidenav";
import navlist from "./navlist";
import loading from "../../commons/loading";
export default class snippetsvba extends Component {
  componentDidMount() {}
  render() {
    const { cat } = this.props.match.params;
    const LoadableComponent = Loadable({
      loader: () => import("./contents/" + cat),
      loading: loading
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="d-none d-md-block col-md-2">
            <Sidenav cat={cat} navlist={navlist} logo="vba.jpg" />
          </div>
          <div className="col-md-9 col-sm-12 px-sm-5">
            <LoadableComponent />
          </div>
        </div>
      </div>
    );
  }
}
