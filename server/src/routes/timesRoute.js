import express from "express";
import TimeController from "../controllers/timeController.js"; // Certifique-se de que o caminho está correto


// as rotas utilizadas 
const timeRoutes = express.Router();


timeRoutes.get("/", TimeController.listaTime);
timeRoutes.get("/:id", TimeController.listaTimePorId);
timeRoutes.post("/", TimeController.cadastraTime);
timeRoutes.put("/:id", TimeController.atualizarTime);
timeRoutes.delete("/:id", TimeController.apagaTimePorId);



export default timeRoutes;
