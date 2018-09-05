const express = require("express");
const router = express.Router();
const Vote = require("../../models/Vote");

//@route   GET api/votes/test
//@desc    Test votes route
//@access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "votes work"
  });
});

//@route   post api/votes/result
//@desc    Get vote result
//@access  Public
router.post("/result", (req, res) => {
  let errors = {};
  const { id } = req.body;

  Vote.findById(id).then(vote => {
    if (!vote) {
      errors.vote = "Vote not exists";
      return res.status(400).json(errors);
    } else {
      res.json(vote);
    }
  });
});

//@route   GET api/votes/all
//@desc    Get a list of Votes
//@access  Public
router.get("/all", (req, res) => {
  let errors = {};

  Vote.find({}).then(votes => {
    if (!votes) {
      errors.votes = "No vote exists";
      return res.status(400).json(errors);
    } else {
      res.json(votes);
    }
  });
});

//@route   post api/votes/result
//@desc    Get vote result
//@access  Public
router.post("/result", (req, res) => {
  let errors = {};
  const { id } = req.body;

  Vote.findById(id).then(vote => {
    if (!vote) {
      errors.vote = "Vote not exists";
      return res.status(400).json(errors);
    } else {
      res.json(vote);
    }
  });
});

//@route   POST api/votes/create
//@desc    Create a vote
//@access  Public
router.post("/create", (req, res) => {
  const newVote = new Vote({
    createrId: req.body.createrId,
    createrName: req.body.createrName,
    name: req.body.name,
    description: req.body.description,
    voters: [],
    questions: req.body.questions
  });
  newVote.save().then(vote => {
    res.json(vote);
  });
});

//@route   GET api/votes/vote
//@desc    execute a vote
//@access  public
router.post("/vote", (req, res) => {
  let errors = {};
  const id = req.body.id;
  const newVote = {
    name: req.body.name,
    votes: req.body.votes,
    comments: req.body.comments
  };
  console.log(req.body.votes);
  console.log(newVote);
  Vote.findById(id)
    .then(vote => {
      if (!vote) {
        errors.vote = "Vote not exists";
        return res.status(400).json(errors);
      } else {
        vote.voters.unshift(newVote);
        newVote.votes.forEach(function(question) {
          question.answer.forEach(function(ticket) {
            vote.question[question.questionid].options[
              ticket
            ].optiontickets += 1;
          });
        });
        vote.save().then(vote => res.json(vote));
      }
    })
    .catch(err =>
      res.status(404).json({
        votenotfound: "No vote found"
      })
    );
});

//@route   DELETE api/votes/remove
//@desc    delete a vote
//@access  public
router.delete("/remove", (req, res) => {
  let errors = {};
  const id = req.body.id;
  Vote.findByIdAndRemove(id).then(() => {
    res.json({
      success: true
    });
  });
});

module.exports = router;
