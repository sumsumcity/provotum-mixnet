import express from 'express';
import cors from "cors";
import * as bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


export default app;