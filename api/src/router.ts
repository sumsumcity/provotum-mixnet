import express, { Express } from 'express';
import { serialize } from 'v8';
import { exampleRouter } from './example';
import { postvotingRouter } from './postvoting';
import { prevotingRouter } from './prevoting';
import { votingRouter } from './voting';
import {connect} from "./mongodb/initDB" //CAN BE REMOVED --> ONLY PUT THERE WHERE IS NEEDED AFTER REQUEST!

const createRoutes = (): express.Router => {
    const router: express.Router = express.Router();

    //Add all routs here
    router.use("/example", exampleRouter);
    router.use("/prevoting", prevotingRouter);
    router.use("/voting", votingRouter);
    router.use("/postvoting", postvotingRouter);

    router.get('/', (req, res) => {
        console.log("Request to '/'");
        res.send('Hello Typescript!');

        //CAN BE REMOVED!
        connect("testitest");

    });

    // Update the phase: reqParam: vote, phase (ONLY KeyGeneration, Voting or Tallying)
    router.put("/phase", (req, res) => {
        const { exec } = require('child_process');

        if (req.body.phase != "Tallying" && req.body.phase != "KeyGeneration" && req.body.phase != "Voting"){
            res.status(400);
            res.send("Phase does not exist");
            return
        }

        exec('cd .. && cd client && cargo +nightly run --release -- va set_phase --vote "' + req.body.vote + '" --phase "' + req.body.phase + '"', (error: any, stdout: String, stderr: any) => {
            console.log(stdout)
            if (error) {
                res.status(400);
                console.error(`exec error: ${error}`);
                return;
            }
            else if (stdout.search("VotePhaseChanged") > 0) {
                res.json(req.body);
            }
            else if (stdout.search("Connection refused") > 0) {
                res.status(404);
                res.send("WsHandshake failed. Connection refused")
            }
            else if(stdout.search("VoteDoesNotExist") > 0){
                res.status(400);
                res.send("This vote does not exist!")
            }
            else {
                res.status(400);
                res.send("Something went wrong!")
            }
        });
    })
    return router;
}

const loadRoutes = (app: Express): Express => app.use("/", createRoutes());

export { loadRoutes };