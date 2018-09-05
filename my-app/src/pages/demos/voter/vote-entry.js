import React, { Component } from "react";
import spongebob from "./spongebob.jpg";
import Votecreatebutton from "./vote-create-button";
import { Link } from "react-router-dom";
import axios from "axios";

class Voteentry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votes: [{}]
    };
  }
  componentWillMount() {
    axios
      .get("/api/votes/all")
      .then(res => {
        this.setState({ votes: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const Votelist = this.state.votes.map((vote, index) => {
      return (
        <Link
          key={index}
          to={"vote/" + vote._id}
          className="list-group-item list-group-item-action flex-column align-items-start "
        >
          <div className="d-flex justify-content-between">
            <h5 className="mb-1">{vote.name}</h5>
            <small>{vote.date}</small>
          </div>
          <p className="mb-1">{vote.description}</p>
          <small>{vote._id}</small>
        </Link>
      );
    });

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
        <Votecreatebutton />
        <div className="card my-4">
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

        <div className="list-group">{Votelist}</div>
      </div>
    );
  }
}
export default Voteentry;
