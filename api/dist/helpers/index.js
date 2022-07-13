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
