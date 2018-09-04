import React, { Component } from "react";
class About extends Component {
  render() {
    return (
      <div className="container">
        <div className="display-4">About Jianan Wang</div>
        <div>
          <a href="mailto:edwang09@gmail.com">
            <i className="fa fa-envelope fa-lg" /> edwang09@gmail.com
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/wangjianan/">
            <i className="fab fa-linkedin fa-lg" />
          </a>
        </div>
      </div>
    );
  }
}

export default About;
