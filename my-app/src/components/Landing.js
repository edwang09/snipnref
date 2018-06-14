import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="text-center landing p-md-5">
        <div className="container">
          <h1 className="display-4">Snippet and Reference</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
            quaerat dolorum corrupti numquam libero accusantium laudantium
            voluptate adipisci minima cumque quisquam eum fugiat reprehenderit
            esse, molestiae, est ratione nesciunt! Natus.
          </p>
          <hr className="my-4" />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
            quaerat dolorum corrupti numquam libero accusantium laudantium
            voluptate adipisci minima cumque quisquam eum fugiat reprehenderit
            esse, molestiae, est ratione nesciunt! Natus.
          </p>
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
