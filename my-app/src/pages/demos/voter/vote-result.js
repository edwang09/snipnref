import React, { Component } from "react";
import axios from "axios";

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
            className="option"
            key={option.optionid}
            disabled
          >
            <span className = "option__name">{option.optionname}</span>
            <span className = "option__count">{option.optiontickets}</span>
          </div>
        ));
        return (
          <div className="question" key={question.questionid}>
            <div className="question__header">
              <h4>
                {question
                  ? question.questionid + 1 + ". " + question.question
                  : ""}
              </h4>
              {options}
            </div>
          </div>
        );
      });
    }

    return (
      <div className="vote-result">
        {/*<img
          src={spongebob}
          width="160rem"
          className="float-right m-5 d-none d-md-block"
          alt="Spongebob"
        />*/}


        <h1>{vote ? vote.name : ""}</h1>

        <p>{vote ? vote.description : ""}</p>
        <hr />
        <div>{results}</div>
        <hr />
      </div>
    );
  }
}
export default VoteResult;
