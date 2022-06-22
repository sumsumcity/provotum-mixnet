import express from "express"
import { connect } from "../mongodb/initDB";

const helpersRouter: express.Router = express.Router();

helpersRouter.get("/vote", async(req, res) => {
    //connect("provotum");
    const Vote = require("../mongodb/Vote")
    try{
        const vote = await Vote.find() // takes first vote that is in the mongoDB
        res.json(vote)
    } catch (e) {
        console.log(e)
    }
})



export { helpersRouter }