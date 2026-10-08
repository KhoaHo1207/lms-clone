import { env } from "@/config/env.js";
import { errorHandler } from "@/middlewares/error.middleware.js";
import { notFoundHandler } from "@/middlewares/not-found.middleware.js";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/connectDB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin:
      env.NODE_ENV === "production"
        ? env.FRONTEND_URL_PROD
        : env.FRONTEND_URL_DEV,
    credentials: true,
  })
);

//connect to database
connectDB();

// routes

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
