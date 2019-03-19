import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

class Landing extends Component {
  componentDidMount(){
    axios.post('https://nodejs.pub.pgtel.net/auth/plugin/jwang/TopSecret234',{}).then(
      res=>{
        console.log(res)
      }
    ).catch(err=>{
      console.log(err)
    })
  }
  render() {
    return (
      <div className="landing">
        <div className="landing__container">
        <div className="intro">
          <h1 className="intro__title">Yoshio Space</h1>
            <p className="intro__content">
              Yoshio Space is a personal website for documentation of
              works of{" "}
              <strong>Jianan Wang
              </strong>{" "}
              who is an enthusiast in all the area of application development,
              technologies. This website contains works on code snippets,
              mini Application and will include more interesting stuffs.
            </p>
            <hr/>
            <p className="intro__subcontent">This website is built using MERN Stack(MongoDB, Express, ReactJS, Node). It also serves as a backend server for other applications.</p>
            <Link className="intro__button" to="/about">
              About Jianan
            </Link>
        </div>
        </div>
      </div>
    );
  }
}

export default Landing;
