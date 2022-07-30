// TODO: If identity management is implemented then erase the code below

import mongoose from "mongoose"

const votedSchema = new mongoose.Schema({
    questionName: String,
    voted: Boolean
})

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    votedQuestions: [votedSchema],
    logged_in: Boolean,
    participated_in_election: Boolean
})

module.exports = mongoose.model("User", userSchema)