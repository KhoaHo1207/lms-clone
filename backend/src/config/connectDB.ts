import { env } from "@/config/env.js";
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
