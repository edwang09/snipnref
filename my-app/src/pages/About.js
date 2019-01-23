import React, { Component } from "react";
class About extends Component {
  render() {
    return (
      <div className="about">
        <h1 >About Jianan Wang</h1>
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
        <h2>
          Education
        </h2>
        <h3>
        Master of Science in Mathematical Finance
        </h3>
        <p>University of North Carolina at Charlotte</p>
        <h3>
        Bachelor of Engineering in Engineering Science
        </h3>
        <p>Kyoto University</p>
        <hr/>
        <h2>
          Experience
        </h2>
        <h3>
        Data Analyst
        </h3>
        <p>LPL Financial</p>
        <h3>
        Freelancing Developer
        </h3>
      </div>
    );
  }
}

export default About;
