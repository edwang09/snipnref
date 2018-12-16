import React, { Component } from "react";
import Loadable from "react-loadable";
import loading from "../commons/loading";

export default class snippetsreactjs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}
  render() {
    const { id } = this.props.match.params;
    console.log(id);
    const LoadableComponent = Loadable({
      loader: () => import("./articles/" + id),
      loading: loading
    });

    return (
      <div className="container">
        <div className="my-5">
          <div className="">
            <LoadableComponent />
          </div>
        </div>
      </div>
    );
  }
}
