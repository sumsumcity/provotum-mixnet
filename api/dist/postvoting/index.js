"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postvotingRouter = express_1.default.Router();
exports.postvotingRouter = postvotingRouter;
const bodyParser = require("body-parser");
// Make decryption: reqParam: vote, question, sk, sealer
postvotingRouter.post("/decrypt", (req, res) => {
    const { exec } = require('child_process');
    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- sealer decrypt --vote "' + req.body.vote + '" --question "' + req.body.question + '" --sk "' + req.body.sk + '" --who "' + req.body.sealer + '"', (error, stdout, stderr) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("successfully submitted partial decryption!") > 0) {
            res.json(req.body);
            const Vote = require("../mongodb/Vote");
            // Save decrypted_sealer to the Vote
            yield Vote.findOneAndUpdate({ vote: req.body.vote }, { $push: { "questions.$[el].decrypted_sealers": req.body.sealer }, }, { arrayFilters: [{ "el.questionName": req.body.question }] });
        }
        else if (stdout.search("VoteDoesNotExist") > 0) {
            res.status(400);
            res.send("This vote does not exist");
        }
        else if (stdout.search("Connection refused") > 0) {
            res.status(404);
            res.send("WsHandshake failed. Connection refused");
        }
        else if (stdout.search("DecryptedShareProofError") > 0) {
            res.status(400);
            res.send("Decyroted share proof error: The sk might be wrong");
        }
        else {
            console.log(stdout);
            res.status(400);
            res.send("Something went wrong!");
        }
    }));
});
// Make decryption: reqParam: vote, question
postvotingRouter.post("/combine", (req, res) => {
    const { exec } = require('child_process');
    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- va tally_question --vote "' + req.body.vote + '" --question "' + req.body.question + '"', (error, stdout, stderr) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("successfully tallied question") > 0) {
            res.json(req.body);
            const Vote = require("../mongodb/Vote");
            // Save decrypted_sealer to the Vote
            yield Vote.findOneAndUpdate({ vote: req.body.vote }, { "questions.$[el].combined_decrypted_shares": true }, { arrayFilters: [{ "el.questionName": req.body.question }] });
        }
        else if (stdout.search("Connection refused") > 0) {
            res.status(404);
            res.send("WsHandshake failed. Connection refused");
        }
        else if (stdout.search("TopicHasAlreadyBeenTallied") > 0) {
            res.status(400);
            res.send("This question has already been tallied");
        }
        else {
            res.status(400);
            res.send("Something went wrong!");
        }
    }));
});
// Get result: reqParam: question
postvotingRouter.post("/result", (req, res) => {
    const { exec } = require('child_process');
    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- va result --question "' + req.body.question + '"', (error, stdout, stderr) => {
        console.log(stdout);
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("is...") > 0) {
            res.send(stdout);
        }
        else if (stdout.search("Connection refused") > 0) {
            res.status(404);
            res.send("WsHandshake failed. Connection refused");
        }
        else if (stdout.search("failed to fetch tally!") > 0) {
            res.status(400);
            res.send("Failed to fetch tally: Maybe the question is wrong");
        }
        else {
            res.status(400);
            res.send("Something went wrong!");
        }
    });
});
