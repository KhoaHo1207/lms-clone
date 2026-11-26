import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { ENV } from "./config/env.js";
import { dbConnect } from "./config/dbConnect.js";
import { arcjetShield } from "./middlewares/arcjet.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { notFound } from "./middlewares/not-found.js";
import initRoutes from "./routes/index.route.js";

const app = express();

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(arcjetShield);

dbConnect();

initRoutes(app);

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use(notFound);
app.use(errorHandler);

export default app;
