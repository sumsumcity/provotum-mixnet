"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRoutes = void 0;
const express_1 = __importDefault(require("express"));
const example_1 = require("./example");
const postvoting_1 = require("./postvoting");
const prevoting_1 = require("./prevoting");
const voting_1 = require("./voting");
const createRoutes = () => {
    const router = express_1.default.Router();
    //Add all routs here
    router.use("/example", example_1.exampleRouter);
    router.use("/prevoting", prevoting_1.prevotingRouter);
    router.use("/voting", voting_1.votingRouter);
    router.use("/postvoting", postvoting_1.postvotingRouter);
    router.get('/', (req, res) => {
        console.log("Request to '/'");
        res.send('Hello Typescript!');
    });
    // Update the phase: reqParam: vote, phase (ONLY KeyGeneration, Voting or Tallying)
    router.put("/phase", (req, res) => {
        const { exec } = require('child_process');
        if (req.body.phase != "Tallying" && req.body.phase != "KeyGeneration" && req.body.phase != "Voting") {
            res.status(400);
            res.send("Phase does not exist");
            return;
        }
        exec('cd .. && cd client && cargo +nightly run --release -- va set_phase --vote "' + req.body.vote + '" --phase "' + req.body.phase + '"', (error, stdout, stderr) => {
            console.log(stdout);
            if (error) {
                res.status(400);
                console.error(`exec error: ${error}`);
                return;
            }
            else if (stdout.search("VotePhaseChanged") > 0) {
                res.json(req.body);
            }
            else if (stdout.search("Connection refused") > 0) {
                res.status(404);
                res.send("WsHandshake failed. Connection refused");
            }
            else if (stdout.search("VoteDoesNotExist") > 0) {
                res.status(400);
                res.send("This vote does not exist!");
            }
            else {
                res.status(400);
                res.send("Something went wrong!");
            }
        });
    });
    return router;
};
const loadRoutes = (app) => app.use("/", createRoutes());
exports.loadRoutes = loadRoutes;
