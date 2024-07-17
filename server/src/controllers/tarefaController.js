import db from "../config/firebaseConfig.js";
import {
  validarCamposObrigatoriosTarefa,
  validarCamposValidosTarefa,
} from "../models/Tarefas.js";
import {
  listaTarefaService,
  cadastraTarefaService,
  listaTarefaPorIdService,
  atualizarTarefaService,
  apagaTarefaPorIdService,
} from "../services/tarefaService.js";
class TarefaController {
  // consultar tarefas
  static async listaTarefa(req, res) {
    try {
      const tarefas = await listaTarefaService();
      res.status(200).json(tarefas);
    } catch (error) {
      res.status(500).send("Erro ao buscar tarefas.");
    }
  }

  // cadastra tarefas e verifica campos
  static async cadastraTarefa(req, res) {
    try {
      const tarefasRef = await cadastraTarefaService(req.body);

      res.status(201).send(`Tarefa criada com ID: ${tarefasRef.ID}`);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      res.status(500).send("Erro ao criar tarefa. Por favor, tente novamente.");
    }
  }

  static async contaTarefaUser(req, res) {
    req;
  }
  // consulta tarefa através do ID
  static async listaTarefaPorId(req, res) {
    const {id} = req.params;
    try {
      const tarefa = await listaTarefaPorIdService(id);
      res.status(200).json(tarefa);
    } catch (error) {
      res.status(500).send("Erro ao buscar tarefa.");
    }
  }

  // Atualiza tarefa através do ID e verifica campos inválidos
  static async atualizarTarefa(req, res) {
    const {id} = req.params;
    try {
      const resp = await atualizarTarefaService(id, req.body);
      res.status(200).send(`Tarefa com ID: ${id} atualizada com sucesso.`);
    } catch (error) {
      res
        .status(500)
        .send("Erro ao atualizar tarefa. Por favor, tente novamente.");
    }
  }

  // apaga tarefa por ID
  static async apagaTarefaPorId(req, res) {
    const {id} = req.params;

    try {
      await apagaTarefaPorIdService(id);
      res.status(200).json(`Tarefa com ID: ${id} deletada com sucesso.`);
    } catch (error) {
      res
        .status(500)
        .send("Erro ao deletar tarefa. Por favor, tente novamente.");
    }
  }
}

export default TarefaController;
