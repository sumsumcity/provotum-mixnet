"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRoutes = void 0;
const express_1 = __importDefault(require("express"));
const example_1 = require("./example");
const createRoutes = () => {
    const router = express_1.default.Router();
    //Add all routs here
    router.use("/example", example_1.exampleRouter);
    router.get('/', (req, res) => {
        console.log("Request to '/'");
        res.send('Hello Typescript!');
    });
    return router;
};
const loadRoutes = (app) => app.use("/", createRoutes());
exports.loadRoutes = loadRoutes;
