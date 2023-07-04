import { Router } from "express";
import { router as userRoutes } from "./user.routes";

const combinedRouter = Router();

combinedRouter.use(userRoutes);

export { combinedRouter as router };
