import db from "../config/firebaseConfig.js";
import {
  validarCamposObrigatoriosTime,
  validarCamposValidosTime,
} from "../models/Times.js";

class TimeController {
  // consultar times
  static async listaTime(req, res) {
    try {
      // verifica a coleção de times
      const snapshot = await db.collection("times").get();
      // se estiver vazio retorna msg
      if (snapshot.empty) {
        return res.status(404).send("Não há times cadastrados.");
      }

      let times = [];
      snapshot.forEach((doc) => {
        times.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      res.status(200).json(times);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
      res.status(500).send("Erro ao buscar times.");
    }
  }

  // cadastra times e verifica campos
  static async cadastraTime(req, res) {
    const camposFaltando = validarCamposObrigatoriosTime(req.body);
    const camposInvalidos = validarCamposValidosTime(req.body);

    if (camposFaltando.length > 0) {
      return res
        .status(400)
        .json({error: `Campos faltando: ${camposFaltando.join(", ")}`});
    }

    if (camposInvalidos.length > 0) {
      return res
        .status(400)
        .json({error: `Campos inválidos: ${camposInvalidos.join(", ")}`});
    }

    try {
      const {id_usu, nome_time} = req.body;
      const time = {id_usu, nome_time};

      const timesRef = await db.collection("times").add(time);

      res.status(201).send(`Time criado com ID: ${timesRef.id}`);
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

    const {id_usu, nome_time} = req.body;

    if (!id_usu && !nome_time) {
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
      if (id_usu) dadosAtualizados.id_usu = id_usu;
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
      const timeRef = db.collection("times").doc(id);
      const timeDoc = await timeRef.get();

      if (!timeDoc.exists) {
        return res.status(404).send("Time não encontrado.");
      }

      await timeRef.delete();
      res.status(200).json(`Time com ID: ${id} deletado com sucesso.`);
    } catch (error) {
      console.error("Erro ao deletar time:", error);
      res.status(500).send("Erro ao deletar time. Por favor, tente novamente.");
    }
  }
}

export default TimeController;
