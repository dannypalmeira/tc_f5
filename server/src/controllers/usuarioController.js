import db from "../config/firebaseConfig.js";
import {
  validarCamposObrigatorios,
  validarCamposValidos,
} from "../models/Usuarios.js";

class UsuarioController {
  // consultar usuarios
  static async listaUsuario(req, res) {
    try {
      // verifica a coleção de usuarios
      const snapshot = await db.collection("usuarios").get();
      // se estiver vazio retorna msg
      if (snapshot.empty) {
        return res.status(404).send("Não há usuários cadastrados.");
      }

      let usuarios = [];
      snapshot.forEach((doc) => {
        usuarios.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      res.status(200).json(usuarios);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).send("Erro ao buscar usuários.");
    }
  }
  // cadastra usuarios e verifica campos
  static async cadastraUsuario(req, res) {
    const camposFaltando = validarCamposObrigatorios(req.body);
    const camposInvalidos = validarCamposValidos(req.body);

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
      const {nome, tipo_usu, email, senha} = req.body;
      const usuario = {nome, tipo_usu, email, senha};

      const usuariosRef = await db.collection("usuarios").add(usuario);

      res.status(201).send(`Usuário criado com ID: ${usuariosRef.id}`);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res
        .status(500)
        .send("Erro ao criar usuário. Por favor, tente novamente.");
    }
  }
  // consulta usuario atravês do ID
  static async listaUsuarioPorId(req, res) {
    const {id} = req.params;

    try {
      const usuarioDoc = await db.collection("usuarios").doc(id).get();

      if (!usuarioDoc.exists) {
        return res.status(404).send("Usuário não encontrado.");
      }

      const usuario = {
        id: usuarioDoc.id,
        dados: usuarioDoc.data(),
      };

      res.status(200).json(usuario);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).send("Erro ao buscar usuário.");
    }
  }
  //  Atualiza usuario atravês do ID e verifica campos invalidos
  static async atualizarUsuario(req, res) {
    const {id} = req.params;
    const camposInvalidos = validarCamposValidos(req.body);

    if (camposInvalidos.length > 0) {
      return res
        .status(400)
        .json({error: `Campos inválidos: ${camposInvalidos.join(", ")}`});
    }

    const {nome, tipo_usu, email, senha} = req.body;

    if (!nome && !tipo_usu && !email && !senha) {
      return res
        .status(400)
        .json({error: "Nenhum campo para atualizar fornecido."});
    }

    try {
      const usuarioRef = db.collection("usuarios").doc(id);
      const usuarioDoc = await usuarioRef.get();

      if (!usuarioDoc.exists) {
        return res.status(404).send("Usuário não encontrado.");
      }

      const dadosAtualizados = {};
      if (nome) dadosAtualizados.nome = nome;
      if (tipo_usu) dadosAtualizados.tipo_usu = tipo_usu;
      if (email) dadosAtualizados.email = email;
      if (senha) dadosAtualizados.senha = senha;

      await usuarioRef.update(dadosAtualizados);

      res.status(200).send(`Usuário com ID: ${id} atualizado com sucesso.`);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res
        .status(500)
        .send("Erro ao atualizar usuário. Por favor, tente novamente.");
    }
  }

  // apaga usuario por ID
  static async apagaUsuarioPorId(req, res) {
    const {id} = req.params;

    try {
      const usuarioRef = db.collection("usuarios").doc(id);
      const usuarioDoc = await usuarioRef.get();

      if (!usuarioDoc.exists) {
        return res.status(404).send("Usuário não encontrado.");
      }

      await usuarioRef.delete();
      res.status(200).json(`Usuário com ID: ${id} deletado com sucesso.`);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res
        .status(500)
        .send("Erro ao deletar usuário. Por favor, tente novamente.");
    }
  }
}

export default UsuarioController;
