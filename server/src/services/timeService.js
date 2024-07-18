import {
  buscaTimesRepository,
  cadastraTimeRepository,
} from "../repositories/timeRepository.js";
import {
  validarCamposObrigatoriosTime,
  validarCamposValidosTime,
} from "../models/Times.js";
export const buscaTimesService = async () => {
  const times = await buscaTimesRepository();
  return times;
};
export const buscaMembrosService = async (body) => {
  if (!body) {
    throw new Error("Digite o ID do time");
  }
  let listaId = req.body;
};

export const cadastraTimeService = async (body) => {
  const camposFaltando = validarCamposObrigatoriosTime(body);
  const camposInvalidos = validarCamposValidosTime(body);

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

  const time = cadastraTimeRepository(body);
  return time;
};
