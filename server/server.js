import app from "./src/app.js";
//porta utilizada
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor Funcionando na porta ${PORT}!`);
});
