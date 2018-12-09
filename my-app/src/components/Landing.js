import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="text-center landing p-md-5">
        <div className="container">
        <div className="intro">
        
          <h1 className="display-4">Yoshio Space</h1>
            <p className="h4">
            Yoshio Space is a personal website for documentation of
              works of{" "}
              <strong>Ed Wang
              </strong>{" "}
              who is an enthusiast in all the area of application development,
              technologies. This website contains works on code snippets,
              references, code examples, package introductions, and code demos.
            </p>
            <hr className="my-4" />
            <p>Learn and live.</p>
            <p className="lead">
              <Link className="btn btn-primary btn-lg" to="/about">
                Learn more
              </Link>
            </p>
        
        
        </div>
        </div>
      </div>
    );
  }
}

export default Landing;
