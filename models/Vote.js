const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [{
        questionid: {
            type: Number,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        tickets: {
            type: Number,
            required: true
        },
        options: [{
            optionid: {
                type: Number,
                required: true
            },
            optionname: {
                type: String,
                required: true
            },
            optiondescription: {
                type: String,
                required: false
            },
            optionimage: {
                type: String,
                required: false
            }
        }]
    }],
    voters: [{
        name: {
            type: String,
            required: true
        },
        votes: [{
            questionid: {
                type: Number,
                required: true
            },
            answer: [{
                type: Number,
                required: false
            }],

        }],
        votedate: {
            type: Date,
            default: Date.now
        },

        comments: {
            type: String,
            required: false
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Vote = mongoose.model("votes", VoteSchema);