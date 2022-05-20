import { Express } from 'express';
import config from "./config";
import { loadRoutes } from './router';
import app from "./server";

async function startServer () {
    await loader(app);

    app.listen(config.port, () => {
        console.log(`Server is running and listening at http://localhost:${config.port}`)
    });
}

const loader = async (app: Express) => {
    loadRoutes(app)
    console.log("Routes loaded");
}

startServer().catch((error) => {
    console.error(`Failed to start server on port: ${config.port}`, error);
    process.exit(1);
});
