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
exports.helpersRouter = void 0;
const express_1 = __importDefault(require("express"));
const helpersRouter = express_1.default.Router();
exports.helpersRouter = helpersRouter;
helpersRouter.get("/allVote", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //connect("provotum");
    const Vote = require("../mongodb/Vote");
    try {
        const vote = yield Vote.find(); // takes first vote that is in the mongoDB
        res.json(vote);
    }
    catch (e) {
        console.log(e);
    }
}));
helpersRouter.get("/questions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //connect("provotum");
    const Vote = require("../mongodb/Vote");
    try {
        const vote = yield Vote.find({ vote: req.body.vote }).select("questions -_id"); // takes first vote that is in the mongoDB
        res.json(vote);
    }
    catch (e) {
        console.log(e);
    }
}));
helpersRouter.get("/phase", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //connect("provotum");
    const Vote = require("../mongodb/Vote");
    try {
        const vote = yield Vote.find({ vote: req.body.vote }).select("phase -_id"); // takes first vote that is in the mongoDB
        res.json(vote);
    }
    catch (e) {
        console.log(e);
    }
}));
// TODO: If identity management is implemented then erase the code below
helpersRouter.get("/allUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //connect("provotum");
    const User = require("../mongodb/User");
    try {
        const users = yield User.find(); // takes first vote that is in the mongoDB
        res.json(users);
    }
    catch (e) {
        console.log(e);
    }
}));
// TODO: If identity management is implemented then erase the code below
helpersRouter.post("/userWithUsername", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //connect("provotum");
    const User = require("../mongodb/User");
    try {
        const user = yield User.find({ name: req.body.name });
        res.json(user);
    }
    catch (e) {
        console.log(e);
    }
}));
// TODO: If identity management is implemented then erase the code below
helpersRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //connect("provotum");
    const User = require("../mongodb/User");
    try {
        const password = yield User.find({ name: req.body.name }).select("password -_id");
        const status = yield User.find({ name: req.body.name }).select("logged_in -_id");
        if (password.length === 0) {
            res.status(404);
            res.json({ message: "username was not found" });
        }
        else if (password[0].password !== req.body.password) {
            res.status(404);
            res.json({ message: "wrong password" });
        }
        else if (status[0].logged_in === true) {
            res.status(404);
            res.json({ message: "this user is already logged in" });
        }
        else {
            yield User.findOneAndUpdate({ vote: req.body.name }, { logged_in: true });
            res.json({ message: "login successfull" });
        }
    }
    catch (e) {
        console.log(e);
    }
}));
// TODO: If identity management is implemented then erase the code below
helpersRouter.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //connect("provotum");
    const User = require("../mongodb/User");
    try {
        const user = yield User.findOneAndUpdate({ name: req.body.name }, { logged_in: false });
        if (user === null) {
            res.status(404);
            res.send("This user was not found");
        }
        else {
            res.status(200);
            res.send(req.body.name + " is logged out");
        }
    }
    catch (e) {
        console.log(e);
    }
}));
// For Election - Add election_list_members to question (Party)
helpersRouter.post("/addListToParty", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //connect("provotum");
    const Vote = require("../mongodb/Vote");
    try {
        // Save election_list_members to the Question
        yield Vote.findOneAndUpdate({ vote: req.body.vote }, { "questions.$[el].election_list_members": req.body.election_list_members }, { arrayFilters: [{ "el.questionName": req.body.question }] });
        const vote = yield Vote.findOneAndUpdate({ vote: req.body.vote }, { "number_of_seats": req.body.number_of_seats });
        res.json(vote);
    }
    catch (e) {
        res.send(e);
        console.log(e);
    }
}));
helpersRouter.put("/electionParticipation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //connect("provotum");
    const User = require("../mongodb/User");
    try {
        const user = yield User.findOneAndUpdate({ name: req.body.name }, { participated_in_election: true });
        if (user === null) {
            res.status(404);
            res.send("This user was not found");
        }
        else {
            res.status(200);
            res.send(req.body.name + " participated in election");
        }
    }
    catch (e) {
        console.log(e);
    }
}));
