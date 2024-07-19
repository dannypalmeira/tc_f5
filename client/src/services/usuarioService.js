// usuarioService.js
import axios from "axios";

const baseUrl = "http://localhost:4000";


export const buscaUsuariosDoTime = async (idTime) => {
  try {

    const response = await axios.get(`${baseUrl}/usuarios`);
    const usuarios = response.data;


    console.log("Dados recebidos da API:", usuarios);


    const nomesUsuariosDoTime = usuarios
      .filter(usuario =>
        usuario.data.time && usuario.data.time.includes(idTime)
      )
      .map(usuario => usuario.data.nome); 
    console.log("Nomes dos usuários pertencentes ao time:", nomesUsuariosDoTime);

    return nomesUsuariosDoTime;
  } catch (error) {
    console.error("Erro ao buscar usuários do time:", error);
    throw error;
  }
};
