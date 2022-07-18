"use strict";
// TODO: If identity management is implemented then erase the code below
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const votedSchema = new mongoose_1.default.Schema({
    questionName: String,
    voted: Boolean
});
const userSchema = new mongoose_1.default.Schema({
    name: String,
    password: String,
    votedQuestions: [votedSchema],
    logged_in: Boolean,
});
module.exports = mongoose_1.default.model("User", userSchema);
