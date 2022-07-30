"use strict";
const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    questionName: String,
    decrypted_sealers: [String],
    combined_decrypted_shares: Boolean,
    election_list_members: [String]
});
const voteSchema = new mongoose.Schema({
    vote: String,
    questions: [questionSchema],
    phase: String,
    number_of_sealers: Number,
    combined_key_shares: Boolean,
    sealers: [String],
    number_of_seats: Number
});
module.exports = mongoose.model("Vote", voteSchema);
