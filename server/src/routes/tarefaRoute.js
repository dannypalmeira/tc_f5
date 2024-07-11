import {Router} from "express";

const tarefaRoutes = Router();

tarefaRoutes.get("/", TarefaController.listaTarefa);
tarefaRoutes.get("/:id", TarefaController.listaTarefaPorId);
tarefaRoutes.post("/", TarefaController.cadastraTarefa);
tarefaRoutes.put("/:id", TarefaController.atualizarTarefa);
tarefaRoutes.delete("/:id", TarefaController.apagaTarefaPorId);

export default tarefaRoutes;
