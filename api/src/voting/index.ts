import express from "express"

const votingRouter: express.Router = express.Router();

const bodyParser = require("body-parser");

// Make a vote: reqParam: vote, question, nr_of_votes, votes
votingRouter.post("/vote", (req, res) => {
    const { exec } = require('child_process');

    exec('cd .. && cd client && cargo +nightly run --release -- voter --vote "' + req.body.vote + '" --question "' + req.body.question + '" --nr-of-votes "' + req.body.nr_of_votes + '" --votes "' + req.body.votes + '"', (error: any, stdout: String, stderr: any) => {
        console.log(stdout)
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("successfully created") > 0) {
            res.json(req.body);
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