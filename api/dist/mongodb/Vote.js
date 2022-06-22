"use strict";
const mongoose = require("mongoose");
const voteSchema = new mongoose.Schema({
    vote: String,
    questions: [String],
    phase: String
});
module.exports = mongoose.model("Vote", voteSchema);
