import express, { Express } from 'express';
import { exampleRouter } from './example';
import { prevotingRouter } from './prevoting';

const createRoutes = (): express.Router => {
    const router: express.Router = express.Router();

    //Add all routs here
    router.use("/example", exampleRouter);
    router.use("/prevoting", prevotingRouter);

    router.get('/', (req, res) => {
        console.log("Request to '/'");
        res.send('Hello Typescript!');
    });

    return router;
}

const loadRoutes = (app: Express): Express => app.use("/", createRoutes());

export { loadRoutes };