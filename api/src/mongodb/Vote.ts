const mongoose = require("mongoose")

const voteSchema = new mongoose.Schema({
    vote: String,
    question: String
})

module.exports = mongoose.model("Vote", voteSchema)