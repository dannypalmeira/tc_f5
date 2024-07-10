import express from "express";
import usuarios from "./usuariosRoute.js";


const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send
    ("TechChallengerF5")
);
    app.use(express.json(), usuarios);

};

export default routes;