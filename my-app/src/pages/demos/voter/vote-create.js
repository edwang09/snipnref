import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
class Votecreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questiontemplate: {
        question: "",
        tickets: 1,
        options: [{ optionid: 0, optionname: "", optiondescription: "" }]
      },
      optiontemplate: { optionname: "", optiondescription: "" },
      questions: [
        {
          questionid: 0,
          question: "",
          tickets: 1,
          options: [{ optionid: 0, optionname: "", optiondescription: "" }]
        }
      ],
      name: "",
      description: ""
    };
  }

  submitVote = () => e => {
    e.preventDefault();
    const { user, isAuthenticated } = this.props.auth;
    axios
      .post("/api/votes/create", {
        createrId: user.id,
        createrName: user.name,
        name: this.state.name,
        description: this.state.description,
        questions: this.state.questions
      })
      .then(res => {
        console.log("success");
      })
      .catch(err => console.log(err));
  };

  deleteQuestion = questionid => e => {
    e.preventDefault();
    console.log("delete question");
    const newquestions = this.state.questions
      .filter(q => q.questionid !== questionid)
      .map((q, id) => {
        return { ...q, questionid: id };
      });
    this.setState({ questions: newquestions });
  };

  deleteOption = (questionid, optionid) => e => {
    e.preventDefault();
    console.log("delete options");
    const newoptions = this.state.questions
      .filter(q => q.questionid === questionid)[0]
      .options.filter(o => o.optionid !== optionid)
      .map((o, id) => {
        return { ...o, optionid: id };
      });
    const newquestion = {
      ...this.state.questions.filter(q => q.questionid === questionid)[0],
      options: newoptions
    };
    const newquestions = this.state.questions.map(q => {
      if (q.questionid === questionid) {
        return newquestion;
      } else {
        return q;
      }
    });

    this.setState({ questions: newquestions });
  };

  addOption = questionid => e => {
    e.preventDefault();
    const newoption = {
      ...this.state.optiontemplate,
      optionid: this.state.questions.filter(q => q.questionid === questionid)[0]
        .options.length
    };
    const newquestion = {
      ...this.state.questions.filter(q => q.questionid === questionid)[0],
      options: [
        ...this.state.questions.filter(q => q.questionid === questionid)[0]
          .options,
        newoption
      ]
    };
    const questions = this.state.questions.map(q => {
      if (q.questionid === questionid) {
        return newquestion;
      } else {
        return q;
      }
    });
    this.setState({ questions });
  };

  addQuestion = () => e => {
    e.preventDefault();
    const newquestion = {
      ...this.state.questiontemplate,
      questionid: this.state.questions.length
    };
    this.setState({ questions: [...this.state.questions, newquestion] });
  };

  render() {
    const questions = this.state.questions.map(question => {
      const optioins = question.options.map(option => {
        return (
          <div className="card" key={option.optionid}>
            <div className="card-header d-flex w-100 justify-content-between">
              <p className="h6">Option {option.optionid + 1}</p>
              <button
                className="btn btn-danger btn-sm text-right"
                onClick={this.deleteOption(
                  question.questionid,
                  option.optionid
                )}
              >
                Delete option
              </button>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="optionname">Option Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="optionname"
                  placeholder="Enter a name for this option"
                  value={option.optionname}
                  onChange={e => {
                    var newquestions = this.state.questions.slice();
                    newquestions
                      .filter(q => q.questionid == question.questionid)[0]
                      .options.filter(
                        o => o.optionid == option.optionid
                      )[0].optionname = e.target.value;
                    this.setState({ questions: newquestions });
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="optiondescription">Option Description</label>
                <textarea
                  row="3"
                  className="form-control"
                  id="optiondescription"
                  placeholder="Enter a description for this option"
                  value={option.optiondescription}
                  onChange={e => {
                    var newquestions = this.state.questions.slice();
                    newquestions
                      .filter(q => q.questionid == question.questionid)[0]
                      .options.filter(
                        o => o.optionid == option.optionid
                      )[0].optiondescription = e.target.value;
                    this.setState({ questions: newquestions });
                  }}
                  required
                />
              </div>
            </div>
          </div>
        );
      });
      return (
        <div key={question.questionid} className="card">
          <div className="card-header d-flex w-100 justify-content-between">
            <p className="h6">Question {question.questionid + 1}</p>
            <button
              className="btn btn-danger btn-sm text-right"
              onClick={this.deleteQuestion(question.questionid)}
            >
              Delete question
            </button>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="question">Question</label>
              <input
                type="text"
                className="form-control"
                id="question"
                placeholder="Enter the question"
                value={question.question}
                onChange={e => {
                  var newquestions = this.state.questions.slice();
                  newquestions.filter(
                    q => q.questionid == question.questionid
                  )[0].question = e.target.value;
                  this.setState({ questions: newquestions });
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tickets">Available tickets</label>
              <input
                type="number"
                className="form-control"
                id="tickets"
                placeholder="Enter amount of ticket per voter"
                value={question.tickets}
                onChange={e => {
                  var newquestions = this.state.questions.slice();
                  newquestions.filter(
                    q => q.questionid == question.questionid
                  )[0].tickets = e.target.value;
                  this.setState({ questions: newquestions });
                }}
                required
              />
            </div>
            <p className="h5">
              Options{" "}
              <button
                className="btn btn-success btn-sm"
                onClick={this.addOption(question.questionid)}
              >
                Add option
              </button>
            </p>
            {optioins}
          </div>
        </div>
      );
    });

    return (
      <div className="container">
        <p className="display-4">Create Vote</p>
        <form onSubmit={this.submitVote()}>
          <div className="form-group">
            <label htmlFor="title">Survey Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter a title for the survey"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Survey description</label>
            <textarea
              row="3"
              className="form-control"
              id="description"
              placeholder="Enter a description for the survey"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              required
            />
          </div>
          <hr />
          {questions}
          <button
            className="btn btn-success btn-sm"
            onClick={this.addQuestion()}
          >
            Add question
          </button>
          <hr />
          <button className="btn btn-primary w-100 m-auto" type="submit">
            Create Survey
          </button>
        </form>
      </div>
    );
  }
}

Votecreate.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {}
)(Votecreate);
