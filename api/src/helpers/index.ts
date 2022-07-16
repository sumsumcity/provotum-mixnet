import express from "express"
import { connect } from "../mongodb/initDB";

const helpersRouter: express.Router = express.Router();

helpersRouter.get("/allVote", async(req, res) => {
    //connect("provotum");
    const Vote = require("../mongodb/Vote")
    try{
        const vote = await Vote.find() // takes first vote that is in the mongoDB
        res.json(vote)
    } catch (e) {
        console.log(e)
    }
})

helpersRouter.get("/questions", async(req, res) => {
    //connect("provotum");
    const Vote = require("../mongodb/Vote")
    try{
        const vote = await Vote.find({vote: req.body.vote}).select("questions -_id") // takes first vote that is in the mongoDB
        res.json(vote)
    } catch (e) {
        console.log(e)
    }
})

helpersRouter.get("/phase", async(req, res) => {
    //connect("provotum");
    const Vote = require("../mongodb/Vote")
    try{
        const vote = await Vote.find({vote: req.body.vote}).select("phase -_id") // takes first vote that is in the mongoDB
        res.json(vote)
    } catch (e) {
        console.log(e)
    }
})

// TODO: If identity management is implemented then erase the code below
helpersRouter.get("/allUsers", async(req, res) => {
    //connect("provotum");
    const User = require("../mongodb/User")
    try{
        const users = await User.find() // takes first vote that is in the mongoDB
        res.json(users)
    } catch (e) {
        console.log(e)
    }
})

// TODO: If identity management is implemented then erase the code below
helpersRouter.post("/userWithUsername", async(req, res) => {
    //connect("provotum");
    const User = require("../mongodb/User")
    try{
        const user = await User.find({name: req.body.name})
        res.json(user)
    } catch (e) {
        console.log(e)
    }
})



export { helpersRouter }