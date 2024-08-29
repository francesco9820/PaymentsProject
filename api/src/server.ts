import express, { Express } from "express";

import bodyParser from 'body-parser';

import handlers from "./handlers";

import errorHandler from "./middlewares/errorHandler";

const app: Express = express();

app.use(bodyParser.json());

app.use("/", handlers);

app.use(errorHandler);

export default app;
