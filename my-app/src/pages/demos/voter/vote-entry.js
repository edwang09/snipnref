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
      <div className="voter">
        {/*<img
          src={spongebob}
          width="160rem"
          className="d-block float-right m-5"
          alt="spongebob"
        />*/}
        <h1>
          Spongebob Voter
        </h1>
        <p > Spongebob Voter is a voter for almost any purpose. You can create questions and decide how many tickets will be given to each voter. Choose approperiate number of tickets to reduce bias.</p>
        <hr/>
        <div className="voter__search">
          <h3>Search for an existing vote created by others?</h3>
          <form className="form">
            <div className="formgroup--inline">
              <label htmlFor="votename">Vote name:</label>
              <input
                type="text"
                id="votename"
                placeholder="Enter vote name"
              />
              <button className="button--success voter__button">Participate</button>
            </div>
          </form>
        </div>

        <div className="voter__list">{Votelist}</div>
        <div className="voter__create">
          <h3>Create a vote for any purpose?</h3>
          <a className="button--success voter__createbutton" href="/demos/votecreate">
            Create a new vote
          </a>
      </div>
      </div>
    );
  }
}
export default Voteentry;
