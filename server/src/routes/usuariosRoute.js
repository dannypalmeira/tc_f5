import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

// as rotas utilizadas
const routes = express.Router();

routes.get("/", UsuarioController.listaUsuario);
routes.get("/:id", UsuarioController.listaUsuarioPorId);
routes.post("/", UsuarioController.cadastraUsuario);
routes.put("/:id", UsuarioController.atualizarUsuario);
routes.delete("/:id", UsuarioController.apagaUsuarioPorId);

export default routes;
