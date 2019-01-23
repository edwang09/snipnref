import React, { Component } from "react";
import spongebob from "./spongebob.jpg";
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
        console.log(res.data)
        this.setState({ votes: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const Votelist = this.state.votes.map((vote, index) => {
      return (
        <tr
          key={index}
        >
          <td >
            <h4 >{vote.name}</h4>
            <small>{vote.date}</small>
          </td>
          <td >{vote.description}</td>
          <td>
            <div className="actions">
              <Link to={"vote/" + vote._id} className="button--success actionbutton">
              participate
              </Link>
              <Link to={"vote-result/" + vote._id} className="button--success actionbutton">
              view result
              </Link>            
            </div>
          </td>
        </tr>
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
          <h3>Looking for an existing vote created by others?</h3>
          {/* <form className="form">
            <div className="formgroup--inline">
              <label htmlFor="votename">Vote name:</label>
              <input
                type="text"
                id="votename"
                placeholder="Enter vote name"
              />
              <button className="button--success voter__button">Participate</button>
            </div>
          </form> */}
        </div>

        <div className="voter__list">
          <div className="list__header">Votes</div>
          <table>
            <tbody>
            <tr>
              <th>name</th>
              <th>description</th>
              <th>action</th>
            </tr>
            {Votelist}
            </tbody>
          </table>
        </div>
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
