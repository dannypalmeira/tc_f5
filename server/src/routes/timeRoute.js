import {Router} from "express";

const timeRoutes = Router();

timeRoutes.get("/", TimeController.listaTime);
timeRoutes.get("/:id", TimeController.listaTimePorId);
timeRoutes.post("/", TimeController.cadastraTime);
timeRoutes.put("/:id", TimeController.atualizarTime);
timeRoutes.delete("/:id", TimeController.apagaTimePorId);
