import {buscaTimesRepository} from "../repositories/timeRepository.js";
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
