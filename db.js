// import { MONGODB_URI } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const database_url = process.env.MONGODB_URI;

if (!database_url) {
  throw new Error('MongoDB URI is not defined in environment variables');
}

// top level await
export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    // console.log(database_url);
    const conn = await mongoose.connect(database_url);

    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
