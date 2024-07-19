// usuarioService.js
import axios from "axios";

const baseUrl = "http://localhost:4000";

// Função para buscar os nomes dos usuários de um time específico
export const buscaUsuariosDoTime = async (idTime) => {
  try {

    const response = await axios.get(`${baseUrl}/usuarios`);
    const usuarios = response.data;


    console.log("Dados recebidos da API:", usuarios);


    const nomesUsuariosDoTime = usuarios
      .filter(usuario =>
        usuario.data.time && usuario.data.time.includes(idTime)
      )
      .map(usuario => ({
        id: usuario.data.uid,
        nome: usuario.data.nome
      }));
      
    console.log("Nomes dos usuários pertencentes ao time:", nomesUsuariosDoTime);

    return nomesUsuariosDoTime;
  } catch (error) {
    console.error("Erro ao buscar usuários do time:", error);
    throw error;
  }
};

export const usuarioPertenceATime = async (usuario) => {
    const response = await axios.get(`${baseUrl}/usuarios/${usuario}`);
    return response.data.time !== null && response.data.time !== undefined;
    
  };