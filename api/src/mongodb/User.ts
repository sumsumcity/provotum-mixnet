// TODO: If identity management is implemented then erase the code below

import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    voted: Boolean,
})

module.exports = mongoose.model("User", userSchema)