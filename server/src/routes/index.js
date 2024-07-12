import express from "express";
import usuarios from "./usuariosRoute.js";
import times from "./timesRoute.js";
import tarefas from "./tarefasRoute.js";

const routes = (app) => {
  app.use(express.json());
  app.route("/").get((req, res) => res.status(200).send("TechChallengerF5"));
  app.use("/usuarios", usuarios);
  app.use("/times", times);
  app.use("/tarefas", tarefas);
};

export default routes;
