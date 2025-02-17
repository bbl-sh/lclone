import connectDB from "./db/index.js";
import dotenv from "dotenv";

// Loading the env file once for the entire project
dotenv.config({
  path: "../.env",
});

// Connecting to database and serving it
connectDB()
  .then(() => {
    console.log("server is connected");
  })
  .catch((error) => {
    console.log(error);
  });
