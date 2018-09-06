import React, { Component } from "react";
import spongebob from "./spongebob.jpg";
import axios from "axios";
import Votecreatebutton from "./vote-create-button";

class VoteResult extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    axios
      .post("/api/votes/result", {
        id: id
      })
      .then(res => {
        this.setState({ vote: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { vote } = this.state;
    let results;
    if (vote && vote.questions) {
      results = vote.questions.map(question => {
        const options = question.options.map(option => (
          <div
            className="bg-light w-100 m-1 p-2 border d-flex  justify-content-between"
            key={option.optionid}
            disabled
          >
            <p className="h5">{option.optionname}</p>
            <p className="h5">{option.optiontickets}</p>
          </div>
        ));
        return (
          <div className="card" key={question.questionid}>
            <div className="card-body">
              <h5>
                {question
                  ? question.questionid + 1 + ". " + question.question
                  : ""}
              </h5>
              {options}
            </div>
          </div>
        );
      });
    }

    return (
      <div className="container">
        <img
          src={spongebob}
          width="160rem"
          className="float-right m-5 d-none d-md-block"
          alt="Spongebob"
        />

        <p className="display-4">{vote ? vote.name : ""}</p>
        <p className="text-right"> ———— Powered by Spongebob Voter.</p>

        <p className="lead">{vote ? vote.description : ""}</p>
        <hr />
        <div>{results}</div>
        <hr />
        <Votecreatebutton />
      </div>
    );
  }
}
export default VoteResult;
