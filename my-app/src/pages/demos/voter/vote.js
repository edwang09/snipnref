import React, { Component } from "react";
import spongebob from "./spongebob.jpg";
import axios from "axios";
import Votecreatebutton from "./vote-create-button";

class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      comments: ""
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    axios
      .post("/api/votes/result", {
        id: id
      })
      .then(res => {
        this.setState({ vote: res.data });
        const votes = res.data.questions.map(question => {
          return {
            questionid: question.questionid,
            answer: []
          };
        });
        this.setState({ votes });
      })
      .catch(err => console.log(err));
  }

  countvote(votes, questionid, id) {
    var i = 0;
    var count = 0;
    if (!votes) {
      return null;
    }
    const answer = votes.filter(vote => vote.questionid === questionid)[0]
      .answer;
    if (!answer) {
      return null;
    }
    while (i < answer.length) {
      if (answer[i] === id) count += 1;
      i += 1;
    }
    let output = [];
    while (count > 0) {
      output.push(<i className="fa fa-ticket-alt m-1" key={count} />);
      count -= 1;
    }
    return <span>{output}</span>;
  }

  vote = (questionid, optionid) => e => {
    e.preventDefault();
    const newanswer = this.state.votes
      .filter(vote => vote.questionid === questionid)[0]
      .answer.concat(optionid);
    const tickets = this.state.vote.questions.filter(
      question => question.questionid === questionid
    )[0].tickets;
    if (tickets > 0) {
      this.setState({
        votes: this.state.votes.map(vote => {
          if (vote.questionid === questionid) {
            return { ...vote, answer: newanswer };
          } else {
            return vote;
          }
        }),
        vote: {
          ...this.state.vote,
          questions: this.state.vote.questions.map(question => {
            if (question.questionid === questionid) {
              return { ...question, tickets: question.tickets - 1 };
            } else {
              return question;
            }
          })
        }
      });
    }
  };

  clearvote = questionid => e => {
    e.preventDefault();
    const tickets = this.state.votes.filter(
      vote => vote.questionid === questionid
    )[0].answer.length;
    this.setState({
      votes: this.state.votes.map(vote => {
        if (vote.questionid === questionid) {
          return { ...vote, answer: [] };
        } else {
          return vote;
        }
      }),
      vote: {
        ...this.state.vote,
        questions: this.state.vote.questions.map(question => {
          if (question.questionid === questionid) {
            return { ...question, tickets: tickets };
          } else {
            return question;
          }
        })
      }
    });
  };

  submitVote = () => e => {
    e.preventDefault();
    const { name, votes, comments } = this.state;
    const { _id } = this.state.vote;
    console.log({ name, comments, votes });
    axios
      .post("/api/votes/vote", { id: _id, name, comments, votes })
      .then(res => {
        this.setState({ vote: res.data, showresult: true });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { vote, votes, showresult } = this.state;
    let questions;
    if (vote && vote.questions) {
      questions = vote.questions.map(question => {
        const options = question.options.map(option => (
          <button
            className="btn btn-lg btn-light w-100 m-1 border text-left "
            key={option.optionid}
            onClick={this.vote(question.questionid, option.optionid)}
          >
            {option.optionname}
            {this.countvote(votes, question.questionid, option.optionid)}
          </button>
        ));
        return (
          <div className="card" key={question.questionid}>
            <div className="card-body">
              <h5>
                {question
                  ? question.questionid + 1 + ". " + question.question
                  : ""}
              </h5>
              <button
                type="button"
                className="btn btn-sm btn-info float-right mb-3"
                onClick={this.clearvote(question.questionid)}
              >
                Tickets: {question ? question.tickets : ""}
              </button>
              {options}
            </div>
          </div>
        );
      });
    }
    if (vote && vote.questions && showresult) {
      questions = vote.questions.map(question => {
        const options = question.options.map(option => (
          <button
            className="btn btn-lg btn-light w-100 m-1 border text-left "
            key={option.optionid}
            onClick={this.vote(question.questionid, option.optionid)}
          >
            {option.optionname}
            {this.countvote(votes, question.questionid, option.optionid)}
          </button>
        ));
        return (
          <div className="card" key={question.questionid}>
            <div className="card-body">
              <h5>
                {question
                  ? question.questionid + 1 + ". " + question.question
                  : ""}
              </h5>
              <button
                type="button"
                className="btn btn-sm btn-info float-right mb-3"
                onClick={this.clearvote(question.questionid)}
              >
                Tickets: {question ? question.tickets : ""}
              </button>
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

        {!this.state.showresult && (
          <form onSubmit={this.submitVote()}>
            <div className="form-group">
              <label htmlFor="votername">Your Name</label>
              <input
                type="text"
                className="form-control"
                id="votername"
                placeholder="Enter your name"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                required
              />
            </div>
            <hr />
            {questions}
            <hr />
            <div className="form-group">
              <label htmlFor="comments">Leave some comments below.</label>
              <textarea
                className="form-control"
                id="comments"
                placeholder="What else do you want to say"
                rows="3"
                value={this.state.comments}
                onChange={e => this.setState({ comments: e.target.value })}
              />
            </div>
            <hr />
            <button className="btn btn-primary w-100 m-auto" type="submit">
              Submit to view result
            </button>
          </form>
        )}
        {this.state.showresult && <p>showresult</p>}
        <hr />
        <Votecreatebutton />
      </div>
    );
  }
}
export default Vote;
