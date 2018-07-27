import React, { Component } from "react";
import spongebob from "./spongebob.jpg";

class Voteentry extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <img
          src={spongebob}
          width="160rem"
          className="d-block float-right m-5"
          alt="not showing"
        />
        <p className="display-4">
          {" "}
          Spongebob Voter
          <span className="lead"> ———— A voter for any purpose.</span>
        </p>
        <div className="card m-4">
          <div className="card-body">
            <h4>Create a vote for any purpose?</h4>
            <a className="btn btn-info " href="/demos/votecreate">
              Create a new vote
            </a>
          </div>
        </div>
        <div className="card m-4">
          <div className="card-body">
            <h4>Participate in an existing vote created by others?</h4>
            <div className="form-group">
              <label htmlFor="vote name">Vote name</label>
              <input
                type="text"
                className="form-control"
                id="vote name"
                placeholder="Enter vote name"
              />
            </div>
            <button className="btn btn-info ">Participate</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Voteentry;
