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
const votingRouter = express_1.default.Router();
exports.votingRouter = votingRouter;
const bodyParser = require("body-parser");
// Make a vote: reqParam: vote, question, nr_of_votes, votes
votingRouter.post("/vote", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { exec } = require('child_process');
    // TODO: If identity management is implemented then erase the code below
    const User = require("../mongodb/User");
    const Vote = require("../mongodb/Vote");
    const userquestion = yield User.where("name").equals(req.body.username).where("votedQuestions.questionName").equals(req.body.question);
    const username = yield User.where("name").equals(req.body.username);
    const votes = yield Vote.where("vote").equals(req.body.vote).where("questions.questionName").equals(req.body.question);
    if (userquestion.length !== 0 && votes[0].questions[0].election_list_members.length === 0) {
        res.status(401);
        res.send("This user has already voted for this question");
        return;
    }
    else if (username.length === 0) {
        res.status(401);
        res.send("This username does not exist");
        return;
    }
    else if (username[0].participated_in_election) {
        res.status(401);
        res.send("This user has already participated in the election");
        return;
    }
    const votequestion = yield Vote.where("vote").equals(req.body.vote).where("questions.questionName").equals(req.body.question);
    if (votequestion.length === 0) {
        res.status(404);
        res.send("This Questions was not found in this vote");
        return;
    }
    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- voter --vote "' + req.body.vote + '" --question "' + req.body.question + '" --nr-of-votes "' + req.body.nr_of_votes + '" --votes "' + req.body.votes + '"', (error, stdout, stderr) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(stdout);
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        else if (stdout.search("successfully created") > 0) {
            res.json(req.body);
            // TODO: If identity management is implemented then erase the code below
            yield User.findOneAndUpdate({ name: req.body.username }, { $push: { votedQuestions: { questionName: req.body.question, voted: true } } });
            // Change to true in participated election if the number of seats are the same number as the number of votes submitted per user
            if (username[0].votedQuestions.length + 1 >= votes[0].number_of_seats) {
                yield User.findOneAndUpdate({ name: req.body.username }, { participated_in_election: true });
            }
        }
        else if (stdout.search("Connection refused") > 0) {
            res.status(404);
            res.send("WsHandshake failed. Connection refused");
        }
        else if (stdout.search("failed to fetch public key!") > 0) {
            res.status(404);
            res.send("There are no public keys");
        }
        else if (stdout.search("failed to create vote") > 0) {
            res.status(400);
            res.send("This vote does not exist");
        }
        else {
            res.status(400);
            res.send("Something went wrong!");
        }
    }));
}));
