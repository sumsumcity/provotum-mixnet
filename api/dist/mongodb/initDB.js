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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
function connect(database) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(database);
        mongoose.connect("mongodb://localhost:27017/" + database, { useNewUrlParser: true })
            .then(() => {
            console.log("Connected to mongodb://localhost:27017/" + database);
        })
            .catch((err) => console.log(err));
        // TODO: If identity management is implemented then erase the code below
        const User = require("./User");
        try {
            const users = yield User.find(); // takes first vote that is in the mongoDB#
            if (users.length === 0) {
                const user1 = new User({ name: "user1", password: "user1", voted: false });
                user1.save().then(() => console.log("New user is saved in mongoDB"));
                const user2 = new User({ name: "user2", password: "user2", voted: false });
                user2.save().then(() => console.log("New user is saved in mongoDB"));
                const user3 = new User({ name: "user3", password: "user3", voted: false });
                user3.save().then(() => console.log("New user is saved in mongoDB"));
                const user4 = new User({ name: "user4", password: "user4", voted: false });
                user4.save().then(() => console.log("New user is saved in mongoDB"));
                const user5 = new User({ name: "user5", password: "user5", voted: false });
                user5.save().then(() => console.log("New user is saved in mongoDB"));
                const user6 = new User({ name: "user6", password: "user6", voted: false });
                user6.save().then(() => console.log("New user is saved in mongoDB"));
                const user7 = new User({ name: "user7", password: "user7", voted: false });
                user7.save().then(() => console.log("New user is saved in mongoDB"));
                const user8 = new User({ name: "user8", password: "user8", voted: false });
                user8.save().then(() => console.log("New user is saved in mongoDB"));
                const user9 = new User({ name: "user9", password: "user9", voted: false });
                user9.save().then(() => console.log("New user is saved in mongoDB"));
                const user10 = new User({ name: "user10", password: "user10", voted: false });
                user10.save().then(() => console.log("New user is saved in mongoDB"));
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.connect = connect;
