import express from "express"

const prevotingRouter: express.Router = express.Router();

const bodyParser = require("body-parser");

// Create Vote: reqParam: vote, question
prevotingRouter.post("/setup", (req, res) => {
    const { exec } = require('child_process');

    exec('cd .. && cd client && cargo +nightly run --release -- va setup --vote "' + req.body.vote + '" --question "' + req.body.question + '"', (error: any, stdout: String, stderr: any) => {
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

    exec('cd .. && cd client && cargo +nightly run --release -- sealer keygen --vote "' + req.body.vote + '" --sk "' + req.body.sk + '" --who "' + req.body.sealer + '"', (error: any, stdout: String, stderr: any) => {
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("successfully submitted public key share!") > 0) {
            res.json(req.body);
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

    exec('cd .. && cd client && cargo +nightly run --release -- va combine_pk_shares --vote "' + req.body.vote + '"', (error: any, stdout: String, stderr: any) => {
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("PublicKeyCreated") > 0) {
            res.json(req.body);
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