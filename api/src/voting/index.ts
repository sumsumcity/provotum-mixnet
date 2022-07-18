import { equal } from "assert";
import express from "express"

const votingRouter: express.Router = express.Router();

const bodyParser = require("body-parser");

// Make a vote: reqParam: vote, question, nr_of_votes, votes
votingRouter.post("/vote", async(req, res) => {
    const { exec } = require('child_process');

    // TODO: If identity management is implemented then erase the code below
    const User = require("../mongodb/User")
    const userquestion = await User.where("name").equals(req.body.username).where("votedQuestions.questionName").equals(req.body.question)
    const username = await User.where("name").equals(req.body.username)
    if (userquestion.length!==0){
        res.status(401)
        res.send("This user has already voted for this question")
        return
    }
    else if (username.length===0){
        res.status(401)
        res.send("This username does not exist")
        return
    }

    const Vote = require("../mongodb/Vote")
    const votequestion = await Vote.where("vote").equals(req.body.vote).where("questions.questionName").equals(req.body.question)
    if (votequestion.length===0){
        res.status(404)
        res.send("This Questions was not found in this vote")
        return
    }

    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- voter --vote "' + req.body.vote + '" --question "' + req.body.question + '" --nr-of-votes "' + req.body.nr_of_votes + '" --votes "' + req.body.votes + '"', async (error: any, stdout: String, stderr: any) => {
        console.log(stdout)
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("successfully created") > 0) {
            res.json(req.body);

            // TODO: If identity management is implemented then erase the code below
            await User.findOneAndUpdate({name: req.body.username},{$push: {votedQuestions: {questionName: req.body.question, voted: true}}})
        }
        else if (stdout.search("Connection refused") > 0){
            res.status(404);
            res.send("WsHandshake failed. Connection refused")
        }
        else if (stdout.search("failed to fetch public key!") > 0){
            res.status(404);
            res.send("There are no public keys")
        }
        else if (stdout.search("failed to create vote") > 0){
            res.status(400);
            res.send("This vote does not exist")
        }
        else {
            res.status(400);
            res.send("Something went wrong!")
        }
    });
})


export { votingRouter }