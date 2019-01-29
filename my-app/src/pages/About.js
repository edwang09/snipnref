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
        Hi,
        My name is Jianan Wang and I am a part-time web developing freelancer.
        I have my day job working as a office app developer and data analyst in one of the largest broker dealer in US. 
        As a freelancer, I have also helped my clients build node js apps that use Oauth and API from Microsoft, Dropbox, Google, etc. 
        I also created websites using various Javascript Frameworks including React-Redux and Angular 6+.
        Most importantly, I love coding, that is why I enjoy working so much. 
        </p>
        <p className="lead">
        If you need help building a website for your business or want to hire somebody to help you build your application, feel free to reach out to me, I would be more than happly to help you. 
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
        <hr/>
        <h2>
          Portfolios
        </h2>
        <h3>
        <a href="www.amethystfs891.com" target="_blank">Amethyst Fengshui Consulting</a>
        </h3>
        <p>Host Website for Amethyst Fengshui Consulting. A Fengshui Consulting service business.</p>

      </div>
    );
  }
}

export default About;
