import React, { Component } from "react";

class Votecreatebutton extends Component {
  render() {
    return (
      <div className="card my-4">
        <div className="card-body">
          <h4>Create a vote for any purpose?</h4>
          <a className="btn btn-info " href="/demos/votecreate">
            Create a new vote (content under construction)
          </a>
        </div>
      </div>
    );
  }
}

export default Votecreatebutton;
