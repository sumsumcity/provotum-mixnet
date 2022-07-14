import express from "express"

const postvotingRouter: express.Router = express.Router();

const bodyParser = require("body-parser");

// Make decryption: reqParam: vote, question, sk, sealer
postvotingRouter.post("/decrypt", (req, res) => {
    const { exec } = require('child_process');

    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- sealer decrypt --vote "' + req.body.vote + '" --question "' + req.body.question +  '" --sk "' + req.body.sk + '" --who "' + req.body.sealer + '"', async (error: any, stdout: String, stderr: any) => {
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("successfully submitted partial decryption!") > 0) {
            res.json(req.body);
            const Vote = require("../mongodb/Vote")

            // Save decrypted_sealer to the Vote
            await Vote.findOneAndUpdate({vote: req.body.vote}, {$push: {"questions.$[el].decrypted_sealers": req.body.sealer},},{arrayFilters:[{"el.questionName":req.body.question}]})
        }
        else if (stdout.search("VoteDoesNotExist") > 0) {
            res.status(400);
            res.send("This vote does not exist");
        }
        else if (stdout.search("Connection refused") > 0){
            res.status(404);
            res.send("WsHandshake failed. Connection refused")
        }
        else if (stdout.search("DecryptedShareProofError") > 0){
            res.status(400);
            res.send("Decyroted share proof error: The sk might be wrong")
        }
        else {
            console.log(stdout)
            res.status(400);
            res.send("Something went wrong!")
        }
    });
})

// Make decryption: reqParam: vote, question
postvotingRouter.post("/combine", (req, res) => {
    const { exec } = require('child_process');

    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- va tally_question --vote "' + req.body.vote + '" --question "' + req.body.question + '"', async (error: any, stdout: String, stderr: any) => {
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("successfully tallied question") > 0) {
            res.json(req.body);

            const Vote = require("../mongodb/Vote")
            // Save decrypted_sealer to the Vote
            await Vote.findOneAndUpdate({vote: req.body.vote}, {"questions.$[el].combined_decrypted_shares": true},{arrayFilters:[{"el.questionName": req.body.question}]})        }
        else if (stdout.search("Connection refused") > 0){
            res.status(404);
            res.send("WsHandshake failed. Connection refused")
        }
        else if (stdout.search("TopicHasAlreadyBeenTallied") > 0){
            res.status(400);
            res.send("This question has already been tallied")
        }
        else {
            res.status(400);
            res.send("Something went wrong!")
        }
    });
})

// Get result: reqParam: question
postvotingRouter.post("/result", (req, res) => {
    const { exec } = require('child_process');

    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- va result --question "' + req.body.question + '"', (error: any, stdout: String, stderr: any) => {
        console.log(stdout)
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("is...") > 0) {
            res.send(stdout);
        }
        else if (stdout.search("Connection refused") > 0){
            res.status(404);
            res.send("WsHandshake failed. Connection refused")
        }
        else if (stdout.search("failed to fetch tally!") > 0){
            res.status(400);
            res.send("Failed to fetch tally: Maybe the question is wrong")
        }
        else {
            res.status(400);
            res.send("Something went wrong!")
        }
    });
})

export { postvotingRouter }