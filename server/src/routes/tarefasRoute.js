import express from "express";
import TarefaController from "../controllers/tarefaController.js"; // Certifique-se de que o caminho está correto

// as rotas utilizadas 
const tarefaRoutes = express.Router();

tarefaRoutes.get("/", TarefaController.listaTarefa);
tarefaRoutes.get("/:id", TarefaController.listaTarefaPorId);
tarefaRoutes.post("/", TarefaController.cadastraTarefa);
tarefaRoutes.put("/:id", TarefaController.atualizarTarefa);
tarefaRoutes.delete("/:id", TarefaController.apagaTarefaPorId);

export default tarefaRoutes;
