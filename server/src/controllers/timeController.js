import db from "../config/firebaseConfig.js";
import {
  validarCamposObrigatoriosTime,
  validarCamposValidosTime,
} from "../models/Times.js";
import {
  buscaTimesService,
  apagaTimePorIdService,
  cadastraTimeService,
} from "../services/timeService.js";
class TimeController {
  // consultar times
  static async listaTime(req, res) {
    try {
      const times = await buscaTimesService();
      return res.status(200).send(times);
    } catch (error) {
      res.status(500).send("Erro ao buscar times.");
    }
  }

  // cadastra times e verifica campos
  static async cadastraTime(req, res) {
    try {
      const time = await cadastraTimeService(req.body);
      res.status(201).send(`Time criado com nome: ${time.nome_time}`);
    } catch (error) {
      console.error("Erro ao criar time:", error);
      res.status(500).send("Erro ao criar time. Por favor, tente novamente.");
    }
  }

  // consulta time atravês do ID
  static async listaTimePorId(req, res) {
    const {id} = req.params;

    try {
      const timeDoc = await db.collection("times").doc(id).get();

      if (!timeDoc.exists) {
        return res.status(404).send("Time não encontrado.");
      }

      const time = {
        id: timeDoc.id,
        dados: timeDoc.data(),
      };

      res.status(200).json(time);
    } catch (error) {
      console.error("Erro ao buscar time:", error);
      res.status(500).send("Erro ao buscar time.");
    }
  }

  // Atualiza time através do ID e verifica campos inválidos
  static async atualizarTime(req, res) {
    const {id} = req.params;
    const camposInvalidos = validarCamposValidosTime(req.body);

    if (camposInvalidos.length > 0) {
      return res
        .status(400)
        .json({error: `Campos inválidos: ${camposInvalidos.join(", ")}`});
    }

    const {usuarios, nome_time} = req.body;

    if (!usuarios && !nome_time) {
      return res
        .status(400)
        .json({error: "Nenhum campo para atualizar fornecido."});
    }

    try {
      const timeRef = db.collection("times").doc(id);
      const timeDoc = await timeRef.get();

      if (!timeDoc.exists) {
        return res.status(404).send("Time não encontrado.");
      }

      const dadosAtualizados = {};
      if (usuarios) dadosAtualizados.usuarios = usuarios;
      if (nome_time) dadosAtualizados.nome_time = nome_time;

      await timeRef.update(dadosAtualizados);

      res.status(200).send(`Time com ID: ${id} atualizado com sucesso.`);
    } catch (error) {
      console.error("Erro ao atualizar time:", error);
      res
        .status(500)
        .send("Erro ao atualizar time. Por favor, tente novamente.");
    }
  }

  // apaga time por ID
  static async apagaTimePorId(req, res) {
    const {id} = req.params;

    try {
      await apagaTimePorIdService(id);
      res.status(200).json(`Time com ID: ${id} deletado com sucesso.`);
    } catch (error) {
      console.error("Erro ao deletar time:", error);
      res.status(500).send("Erro ao deletar time. Por favor, tente novamente.");
    }
  }

  static async buscaMembros(req, res) {
    try {
      const membros = await buscaMembrosService(req.body);
      console.log("controller", membros);
      res.status(200).send(membros);
    } catch {
      res.status(500).send("Erro ao buscar membros");
    }
  }
}

export default TimeController;
