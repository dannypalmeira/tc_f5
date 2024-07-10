import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

// as rotas utilizadas 
const routes = express.Router();

routes.get("/usuarios",UsuarioController.listaUsuario);
routes.get("/usuarios/:id",UsuarioController.listaUsuarioPorId);
routes.post("/usuarios",UsuarioController.cadastraUsuario);
routes.put("/usuarios/:id",UsuarioController.atualizarUsuario);
routes.delete("/usuarios/:id",UsuarioController.apagaUsuarioPorId);

export default routes;