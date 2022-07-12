const mongoose = require("mongoose")

// TODO: Separate db to every question with (question, decrypted_sealers, combined_decyrpted_share, yes_votes, no_votes)
const voteSchema = new mongoose.Schema({
    vote: String,
    questions: [String],
    phase: String,
    number_of_sealers: Number,
    sealers: [String],
})

module.exports = mongoose.model("Vote", voteSchema)