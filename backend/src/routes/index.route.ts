import type { Express } from "express";
import authRouter from "./auth.route.js";

const initRoutes = (app: Express) => {
  app.use("/api/v1/auth", authRouter);
};

export default initRoutes;
