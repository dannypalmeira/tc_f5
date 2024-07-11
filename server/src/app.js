// realizando import necessarios para funcionamento
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";

const app = express();
routes(app);
app.use(bodyParser.json());
app.use(routes);
app.get("/", (req, res) => {
  res.status(200).send("Tech Challenger F5");
});

// realizando export para conversar com demais
export default app;
