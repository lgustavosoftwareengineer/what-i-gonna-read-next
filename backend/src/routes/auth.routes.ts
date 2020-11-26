import { Router } from "express";
import AuthController from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/v1/registry", AuthController.registry);
authRouter.post("/v1/login", AuthController.login);

export default authRouter;
