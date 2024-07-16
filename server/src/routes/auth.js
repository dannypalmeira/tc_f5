import express from "express";
import {loginController} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/", loginController);
// authRouter.get("/:id", TimeController.listaTimePorId);
// authRouter.post("/", TimeController.cadastraTime);
// authRouter.put("/:id", TimeController.atualizarTime);
// authRouter.delete("/:id", TimeController.apagaTimePorId);

export default authRouter;
