import React, { Component } from "react";
import { Link } from "react-router-dom";

class Karaokeentry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votes: [{}]
    };
  }
  componentWillMount() {

  }

  render() {
    return (
        <div className="karaoke-entry">
        <h1>
            Karaoke Starts here
        </h1>
        <Link to="/demos/karaokehost" className= "button--success karaokenav">
            Host on this device
        </Link>
        <Link to="/demos/karaokeclient" className= "button--success karaokenav">
            Order a song
        </Link>
        </div>
    );
  }
}
export default Karaokeentry;
