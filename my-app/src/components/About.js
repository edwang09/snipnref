import React, { Component } from "react";
class About extends Component {
  render() {
    return (
      <div className="container about">
        <p className="display-4">About Jianan Wang</p>
        <p>
          <a href="mailto:edwang09@gmail.com" target="_blank"  rel="noopener noreferrer">
            <i className="fa fa-envelope fa-lg" /> edwang09@gmail.com
          </a>
          {"  "}|{"  "}
          <a href="https://www.linkedin.com/in/wangjianan/" target="_blank"  rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-lg" /> LinkedIn
          </a>{"  "}
          |{"  "}
          <a href="https://github.com/edwang09" target="_blank"  rel="noopener noreferrer">
            <i className="fab fa-github fa-lg" /> GitHub
          </a>
        </p>
        <hr/>
        <p className="lead">
        Greetings! I am an enthusiast in all the area of application development,
              technologies. This website contains works on code snippets,
              references, code examples, package introductions, and code demos.
        </p>
        <hr/>
        <h4>
          Education
        </h4>
        <h5>
        Master of Science in Mathematical Finance
        </h5>
        <p>University of North Carolina at Charlotte</p>
        <h5>
        Bachelor of Engineering in Engineering Science
        </h5>
        <p>Kyoto University</p>
        <hr/>
        <h4>
          Experience
        </h4>
        <h5>
        Data Analyst
        </h5>
        <p>LPL Financial</p>
        <h5>
        Freelancing Developer
        </h5>
      </div>
    );
  }
}

export default About;
