import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `connection established to ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("connection failed");
  }
};

export default connectDB;
