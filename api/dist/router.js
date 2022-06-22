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
exports.loadRoutes = void 0;
const express_1 = __importDefault(require("express"));
const example_1 = require("./example");
const helpers_1 = require("./helpers");
const postvoting_1 = require("./postvoting");
const prevoting_1 = require("./prevoting");
const voting_1 = require("./voting");
const initDB_1 = require("./mongodb/initDB");
const createRoutes = () => {
    const router = express_1.default.Router();
    // Connect to provotum dbs
    (0, initDB_1.connect)("provotum");
    //Add all routs here
    router.use("/example", example_1.exampleRouter);
    router.use("/prevoting", prevoting_1.prevotingRouter);
    router.use("/voting", voting_1.votingRouter);
    router.use("/postvoting", postvoting_1.postvotingRouter);
    router.use("/helpers", helpers_1.helpersRouter); // That client can get some informations which are saved in mongDB
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
        exec('cd .. && cd client && cargo +nightly run --release -- va set_phase --vote "' + req.body.vote + '" --phase "' + req.body.phase + '"', (error, stdout, stderr) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(stdout);
            if (error) {
                res.status(400);
                console.error(`exec error: ${error}`);
                return;
            }
            else if (stdout.search("VotePhaseChanged") > 0) {
                res.json(req.body);
                const Vote = require("./mongodb/Vote");
                // Save Question to the Vote
                yield Vote.findOneAndUpdate({ vote: req.body.vote }, { phase: req.body.phase }, { new: true });
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
        }));
    });
    return router;
};
const loadRoutes = (app) => app.use("/", createRoutes());
exports.loadRoutes = loadRoutes;
