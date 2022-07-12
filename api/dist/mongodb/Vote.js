"use strict";
const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    questionName: String,
    decrypted_sealers: [String],
    combined_decrypted_shares: Boolean
});
const voteSchema = new mongoose.Schema({
    vote: String,
    questions: [questionSchema],
    phase: String,
    number_of_sealers: Number,
    sealers: [String],
});
module.exports = mongoose.model("Vote", voteSchema);
