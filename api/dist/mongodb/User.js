"use strict";
// TODO: If identity management is implemented then erase the code below
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    password: String,
    voted: Boolean,
});
module.exports = mongoose_1.default.model("User", userSchema);
