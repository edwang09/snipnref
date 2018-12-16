import React, { Component } from "react";
import { Link } from "react-router-dom";
import bloglist from "./bloglist";

export default class snippetsreactjs extends Component {
  componentDidMount() {}
  render() {
    const bloglistshow = bloglist.map(b => {
      return (
        <h5>
          <Link to={b.link}>{b.name}</Link>
        </h5>
      );
    });
    return (
      <div className="container">
        <div className="my-5">{bloglistshow}</div>
      </div>
    );
  }
}
