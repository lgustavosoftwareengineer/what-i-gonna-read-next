import { Router } from "express";
import AuthController from "../controllers/AuthController";
import checkSession from "../middlewares/check-session";

const authRouter = Router();

authRouter.use(checkSession);

authRouter.post("/v1/registry", AuthController.registry);
authRouter.post("/v1/login", AuthController.login);
authRouter.delete("/v1/logout", AuthController.logout);

export default authRouter;
