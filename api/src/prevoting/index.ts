import express from "express"

const prevotingRouter: express.Router = express.Router();

const bodyParser = require("body-parser");

// Create Vote: reqParam: vote, question
prevotingRouter.post("/setup", (req, res) => {
    const { exec } = require('child_process');

    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- va setup --vote "' + req.body.vote + '" --question "' + req.body.question + '"', (error: any, stdout: String, stderr: any) => {
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("failed to create vote") > 0 && stdout.search("VoteAlreadyExists") > 0) {
            res.status(400);
            res.send("A vote already exists");
            return
        }
        else if (stdout.search("successfully created vote") > 0) {
            res.json(req.body);
            const Vote = require("../mongodb/Vote")

            // Save Vote in db
            const vote = new Vote({vote: req.body.vote, questions: [{questionName: req.body.question, decrypted_sealers: [], combined_decrypted_shares: false, yes_votes: 0, no_votes: 0}], phase: "KeyGeneration", status: "open", number_of_sealers: 2, combined_key_shares: false, sealers: []})
            vote.save().then(() => console.log("New vote is saved in mongoDB"))

        }
        else if (stdout.search("Connection refused") > 0){
            res.status(404);
            res.send("WsHandshake failed. Connection refused")
        }
        else {
            res.status(400);
            res.send("Something went wrong!")
        }
    });
})

// Create Question: reqParam: vote, question
prevotingRouter.post("/storequestion", (req, res) => {
    const { exec } = require('child_process');

    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- va store_question --vote "' + req.body.vote + '" --question "' + req.body.question + '"', async (error: any, stdout: String, stderr: any) => {
        console.log(stdout)
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("VoteDoesNotExist") > 0) {
            res.status(400);
            res.send("This vote does not exists");
            return
        }
        else if (stdout.search("successfully setup question!") > 0) {
            res.json(req.body);
            const Vote = require("../mongodb/Vote")

            // Save Question to the Vote
            await Vote.findOneAndUpdate({vote: req.body.vote},{$push: {questions: {questionName: req.body.question, decrypted_sealers: [], combined_decrypted_shares: false, yes_votes: 0, no_votes: 0}}})
            
        }
        else if (stdout.search("Connection refused") > 0){
            res.status(404);
            res.send("WsHandshake failed. Connection refused")
        }
        else {
            res.status(400);
            res.send("Something went wrong!")
        }
    });
})

// Create Keys: reqParam: vote, sk, sealer
prevotingRouter.post("/keygen", (req, res) => {
    const { exec } = require('child_process');

    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- sealer keygen --vote "' + req.body.vote + '" --sk "' + req.body.sk + '" --who "' + req.body.sealer + '"', async (error: any, stdout: String, stderr: any) => {
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("successfully submitted public key share!") > 0) {
            res.json(req.body);
            const Vote = require("../mongodb/Vote")

            // Save Question to the Vote
            await Vote.findOneAndUpdate({vote: req.body.vote},{$push: {sealers: req.body.sealer}})
        }
        else if (stdout.search("VoteDoesNotExist") > 0) {
            res.status(400);
            res.send("This vote does not exist");
        }
        else if (stdout.search("Connection refused") > 0){
            res.status(404);
            res.send("WsHandshake failed. Connection refused")
        }
        else {
            res.status(400);
            res.send("Something went wrong!")
        }
    });
})

// Combine Public Key Shares: reqParam: vote
prevotingRouter.post("/combineKeyShares", (req, res) => {
    const { exec } = require('child_process');

    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- va combine_pk_shares --vote "' + req.body.vote + '"', async (error: any, stdout: String, stderr: any) => {
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("PublicKeyCreated") > 0) {
            res.json(req.body);

            const Vote = require("../mongodb/Vote")
            // Changed combined_decrypted_shares to true in the Vote
            await Vote.findOneAndUpdate({vote: req.body.vote}, {combined_key_shares: true})        
        }
        else if (stdout.search("VoteDoesNotExist") > 0) {
            res.status(400);
            res.send("This vote does not exist");
        }
        else if (stdout.search("Connection refused") > 0){
            res.status(404);
            res.send("WsHandshake failed. Connection refused")
        }
        else {
            res.status(400);
            res.send("Something went wrong!")
        }
    });
})

export { prevotingRouter }