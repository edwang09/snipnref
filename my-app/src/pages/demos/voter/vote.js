import React, { Component } from "react";
import spongebob from "./spongebob.jpg";
import axios from "axios";
import { withRouter } from "react-router-dom";

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
        this.setState({
          votes,
          currentTickets: res.data.questions.map(q => {
            return {
              questionid: q.questionid,
              tickets: q.tickets,
              options: q.options.map(o => {
                return {
                  optionid: o.optionid,
                  optiontickets: 0
                };
              })
            };
          })
        });
      })
      .catch(err => console.log(err));
  }

  countvote(votes, questionid, optionid) {
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
      if (answer[i] === optionid) count += 1;
      i += 1;
    }
    let output = [];
    while (count > 0) {
      output.push(<i className="fa fa-ticket-alt ticket" key={count} />);
      count -= 1;
    }
    return <span>{output}</span>;
  }

  vote = (questionid, optionid) => e => {
    e.preventDefault();
    const currentTickets = this.state.currentTickets.filter(
      q => q.questionid === questionid
    )[0].tickets;
    console.log(currentTickets);
    if (currentTickets > 0) {
      const newCurrentTicket = this.state.currentTickets.map(q => {
        if (q.questionid === questionid) {
          return {
            ...q,
            options: q.options.map(o => {
              if (o.optionid === optionid) {
                console.log(o.optiontickets);
                return { ...o, optiontickets: o.optiontickets + 1 };
              }
              return o;
            }),
            tickets: q.tickets - 1
          };
        }
        return q;
      });
      const newanswer = this.state.votes
        .filter(vote => vote.questionid === questionid)[0]
        .answer.concat(optionid);
      this.setState({
        votes: this.state.votes.map(vote => {
          if (vote.questionid === questionid) {
            return { ...vote, answer: newanswer };
          } else {
            return vote;
          }
        }),
        currentTickets: newCurrentTicket
      });
    }
  };

  clearvote = questionid => e => {
    e.preventDefault();
    const newCurrentTicket = this.state.currentTickets.map(q => {
      if (q.questionid === questionid) {
        return {
          ...q,
          options: q.options.map(o => {
            return { ...o, optiontickets: 0 };
          }),
          tickets: this.state.vote.questions.filter(
            q => q.questionid === questionid
          )[0].tickets
        };
      }
      return q;
    });
    this.setState({
      votes: this.state.votes.map(vote => {
        if (vote.questionid === questionid) {
          return { ...vote, answer: [] };
        } else {
          return vote;
        }
      }),
      currentTickets: newCurrentTicket
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
        this.props.history.push(`/demos/vote-result/${_id}`);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { vote, votes, currentTickets } = this.state;
    let questions;
    if (vote && vote.questions && currentTickets) {
      questions = vote.questions.map(question => {
        const options = question.options.map(option => (
          <div className="option" key={option.optionid}
          onClick={this.vote(question.questionid, option.optionid)}>
            <div className="option__header">
              {option.optionname} 
              {this.countvote(votes, question.questionid, option.optionid)}
            </div>
            <div className="option__body">{option.optiondescription}</div>
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
                <button
                  className="button--success ticketbutton"
                  onClick={this.clearvote(question.questionid)}
                >
                  Tickets:{" "}
                  {
                    currentTickets.filter(
                      q => q.questionid === question.questionid
                    )[0].tickets
                  }
                </button>
              {options}
            </div>
          </div>
        );
      });
    }

    return (
      <div className="vote">
        {/*<img
          src={spongebob}
          width="160rem"
          className="float-right m-5 d-none d-md-block"
          alt="Spongebob"
        />*/}

        <h1>{vote ? vote.name : ""}</h1>
        <p>{vote ? vote.description : ""}</p>
        <hr />

        <form onSubmit={this.submitVote()}>
          <div className="formgroup">
            <label htmlFor="votername">Your Name</label>
            <input
              type="text"
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
          <div className="formgroup">
            <label htmlFor="comments">Leave some comments below.</label>
            <textarea
              id="comments"
              placeholder="What else do you want to say"
              rows="3"
              value={this.state.comments}
              onChange={e => this.setState({ comments: e.target.value })}
            />
          </div>
          <hr />
          <button className="button--success" type="submit">
            Submit to view result
          </button>
        </form>
        <hr />
        <div className="createnew">
          <h4>Create a vote for any purpose?</h4>
          <a className="button--success createnew__button" href="/demos/votecreate">
            Create a new vote
          </a>
        </div>
      </div>
    );
  }
}
export default withRouter(Vote);
