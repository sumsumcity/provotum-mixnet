import express from "express"

const exampleRouter: express.Router = express.Router();

exampleRouter.get("/", (req, res) => {
    res.json({"greeting": "Hello world!"});

    const { exec } = require('child_process');

    exec('docker exec cli cargo +nightly run --release -- va setup --vote TestVote --question TestQuestion', (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
})

const bodyParser = require("body-parser");
//express.use(bodyParser.json());

exampleRouter.post("/", (req, res) => {
    console.log("Got body", req.body);
    res.json(req.body);
})

export { exampleRouter }