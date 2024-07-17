import {
  listaTarefaRepository,
  cadastraTarefaRepository,
  listaTarefaPorIdRepository,
  atualizarTarefaRepository,
  apagaTarefaPorIdRepository,
} from "../repositories/tarefaRepository.js";
import {
  validarCamposObrigatoriosTarefa,
  validarCamposValidosTarefa,
} from "../models/Tarefas.js";
export const listaTarefaService = async () => {
  const res = await listaTarefaRepository();
  return res;
};

export const contaTarefauserService = async (id_user) => {
  if (!id_user) {
    throw new Error("Informe o id do usuario");
  }
};
export const cadastraTarefaService = async (body) => {
  const camposFaltando = validarCamposObrigatoriosTarefa(body);
  const camposInvalidos = validarCamposValidosTarefa(body);

  if (camposFaltando.length > 0) {
    throw new Error(`Campos faltando: ${camposFaltando.join(", ")}`);
  }

  if (camposInvalidos.length > 0) {
    throw new Error(`Campos inválidos: ${camposInvalidos.join(", ")}`);
  }
  const {id_time, id_usu, nome_tarefa, descricao, prazo, situacao, data_ini} =
    body;
  const tarefa = {
    id_time,
    nome_tarefa,
    id_usu,
    descricao,
    prazo,
    situacao,
    data_ini,
  };
  const res = cadastraTarefaRepository(tarefa);
  return res;
};

export const listaTarefaPorIdService = async (id) => {
  const tarefaDoc = await listaTarefaPorIdRepository(id);

  if (!tarefaDoc.exists) {
    return [];
  }
  const tarefa = {
    id: tarefaDoc.id,
    ...tarefaDoc.data(),
  };
  return tarefa;
};

export const atualizarTarefaService = async (id, body) => {
  const camposInvalidos = validarCamposValidosTarefa(body);
  if (camposInvalidos.length > 0) {
    throw new Error(`Campos inválidos: ${camposInvalidos.join(", ")}`);
  }
  const {id_time, id_usu, nome_tarefa, descricao, prazo, situacao, data_ini} =
    body;

  if (
    !id_time &&
    !id_usu &&
    !nome_tarefa &&
    !descricao &&
    !prazo &&
    !situacao &&
    !data_ini
  ) {
    throw new Error("Nenhum campo para atualizar fornecido.");
  }

  const tarefa = await listaTarefaPorIdService(id);
  if (!tarefa) {
    throw new Error("tarefa nao encontrada");
  }
  const dadosAtualizados = {};
  if (id_time) dadosAtualizados.id_time = id_time;
  if (id_usu) dadosAtualizados.id_usu = id_usu;
  if (nome_tarefa) dadosAtualizados.nome_tarefa = nome_tarefa;
  if (descricao) dadosAtualizados.descricao = descricao;
  if (prazo) dadosAtualizados.prazo = prazo;
  if (situacao) dadosAtualizados.situacao = situacao;
  if (data_ini) dadosAtualizados.data_ini = data_ini;

  const resp = await atualizarTarefaRepository(id, dadosAtualizados);
  return resp;
};

export const apagaTarefaPorIdService = async (id) => {
  const tarefa = await listaTarefaPorIdService(id);
  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }
  const resp = await apagaTarefaPorIdRepository(id);

  return resp;
};
