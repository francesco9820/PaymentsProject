import dotenv from "dotenv";
import express, { Express } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

import handlers from "./handlers";

import errorHandler from "./middlewares/errorHandler";

import connectToDatabase from "./connectToDatabase";

const app: Express = express();

dotenv.config();

connectToDatabase();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use(cors({origin:true,credentials: true}));

app.use("/", handlers);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
console.log(`[server]: Server is running at port ${port}`);
}); 

export default app;
