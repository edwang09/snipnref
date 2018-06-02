import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="text-center landing ">
        <h1 className="display-4">Hello, world!</h1>
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
          <a className="btn btn-primary btn-lg" href="#">
            Learn more
          </a>
        </p>
      </div>
    );
  }
}

export default Landing;
