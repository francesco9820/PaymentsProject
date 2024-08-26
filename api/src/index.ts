import dotenv from "dotenv";

import connectToDatabase from "./connectToDatabase";

import app from "./server";

const startServer = async () => {
  dotenv.config();
  await connectToDatabase();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`[server]: Server is running at port ${port}`);
  }); 
}

startServer();
