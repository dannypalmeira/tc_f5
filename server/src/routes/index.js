import express from "express";
import usuarios from "./usuariosRoute.js";
import times from "./timeRoute.js";
import tarefas from "./tarefaRoute.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("TechChallengerF5"));
  app.use(express.json());
  app.use("/usuarios", usuarios);
  app.use("/times", times);
  app.use("/tarefas", tarefas);
};

export default routes;
