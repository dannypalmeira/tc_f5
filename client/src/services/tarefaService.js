const baseUrl = "http://localhost:4000";
import axios from "axios";

export const cadastraTarefa = async (tarefa) => {
  const res = await axios.post(`${baseUrl}/tarefas`, tarefa);
};
export const buscaTarefasUser = async (id_user) => {
  const tarefas = await axios(`${baseUrl}/tarefas/user/${id_user}`);
  return tarefas;
};
