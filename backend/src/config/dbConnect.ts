import mongoose from "mongoose";
import { ENV } from "./env.js";

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI, {
      dbName: "lms-clone",
    });
    console.log(
      `Connected to MongoDB: ${conn.connection.host}/${conn.connection.name}`
    );
    return conn.connection.host;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
