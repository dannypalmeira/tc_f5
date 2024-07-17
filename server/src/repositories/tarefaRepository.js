import db from "../config/firebaseConfig.js";

export const listaTarefaRepository = async () => {
  let tarefas = [];
  const snapshot = await db.collection("tarefas").get();
  if (snapshot.empty) return [];
  snapshot.forEach((doc) => {
    tarefas.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return tarefas;
};

export const cadastraTarefaRepository = async (tarefa) => {
  const tarefasRef = await db.collection("tarefas").add(tarefa);
  return tarefasRef;
};

export const listaTarefaPorIdRepository = async (id) => {
  const tarefaDoc = await db.collection("tarefas").doc(id).get();

  return tarefaDoc;
};

export const atualizarTarefaRepository = async (id, tarefa) => {
  const res = await db.collection("tarefas").doc(id).update(tarefa);
  return res;
};

export const apagaTarefaPorIdRepository = async (id) => {
  const tarefaDoc = await db.collection("tarefas").doc(id).delete();
  return tarefaDoc;
};
