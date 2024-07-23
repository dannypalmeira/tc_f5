const baseUrl = "http://localhost:4000";
import axios from "axios";

export const cadastraTarefa = async (tarefa) => {
  const res = await axios.post(`${baseUrl}/tarefas`, tarefa);
};
export const buscaTarefasUser = async (id_user) => {
  const tarefas = await axios(`${baseUrl}/tarefas/user/${id_user}`);
  return tarefas;
};

export const atualizaTarefa = async (id, tarefa) => {
  try {
    const res = await axios.put(`${baseUrl}/tarefas/${id}`, tarefa);
    return res.data;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};

export const buscaTarefaPorId = async (id) => {
  const resposta = await axios.get(`${baseUrl}/tarefas/${id}`);
  return resposta.data; 
};
