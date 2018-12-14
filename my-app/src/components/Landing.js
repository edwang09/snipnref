import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing__container">
        <div className="intro">
          <h1 className="intro__title">Yoshio Space</h1>
            <p className="intro__content">
              Yoshio Space is a personal website for documentation of
              works of{" "}
              <strong>Ed Wang
              </strong>{" "}
              who is an enthusiast in all the area of application development,
              technologies. This website contains works on code snippets,
              references, code examples, package introductions, and code demos.
            </p>
            <hr/>
            <p className="intro__subcontent">Learn and live.</p>
            <Link className="intro__button" to="/about">
              Learn more
            </Link>
        </div>
        </div>
      </div>
    );
  }
}

export default Landing;
