import express, { Router } from "express";
import PingController from "../controllers/PingController";

const pingController = new PingController();
const pingRouter: Router = express.Router();

pingRouter.get("/", pingController.ping);
pingRouter.get("/verify", pingController.verifyPingToken);

export default pingRouter;