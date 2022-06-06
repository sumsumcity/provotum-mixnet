"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose = require('mongoose');
function connect(database) {
    console.log(database);
    mongoose.connect("mongodb://localhost:27017/" + database, { useNewUrlParser: true })
        .then(() => {
        console.log("Connected to mongodb://localhost:27017/" + database);
    })
        .catch((err) => console.log(err));
}
exports.connect = connect;
