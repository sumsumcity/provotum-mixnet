"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exampleRouter = express_1.default.Router();
exports.exampleRouter = exampleRouter;
exampleRouter.get("/", (req, res) => {
    res.json({ "greeting": "Hello world!" });
    const { exec } = require('child_process');
    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- va setup --vote TestVote --question TestQuestion', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
});
const bodyParser = require("body-parser");
//express.use(bodyParser.json());
exampleRouter.post("/", (req, res) => {
    console.log("Got body", req.body);
    res.json(req.body);
    const { exec } = require('child_process');
    exec('cd .. && cd client && rustup run nightly-2022-05-20 cargo run --release -- va setup --vote "' + req.body.vote + '" --question "' + req.body.question + '"', (error, stdout, stderr) => {
        if (error) {
            res.status(400);
            console.error(`exec error: ${error}`);
            return;
        }
        console.log('Here is stdout and stderr:');
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
});
