import express, { Express } from "express";

import bodyParser from 'body-parser';

import handlers from "./handlers";

const app: Express = express();

app.use(bodyParser.json());

app.use("/", handlers);

export default app;
