import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="text-center landing p-md-5">
        <div className="container">
          <h1 className="display-4">Yoshio Space</h1>
          <p className="lead">
            Snippet and Reference is a personal website for documentation of
            works of{" "}
            <span>
              <Link to="#">Jianan Wang</Link>
            </span>{" "}
            who is a enthusiast in all the area of application development,
            technologies. This website contains works on code snippets,
            references, code examples, package introductions, and code demos.
          </p>
          <hr className="my-4" />
          <p>Learn and live.</p>
          <p className="lead">
            <Link className="btn btn-primary btn-lg" to="#">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Landing;
