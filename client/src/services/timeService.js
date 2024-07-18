const baseUrl = "http://localhost:4000";
import axios from "axios";

export const buscatimes = async () => {
  const times = await axios.get(`${baseUrl}/times`);

  return times.data;
};

export const deleteTime = async (id_time) => {
  const deletado = await axios.delete(`${baseUrl}/times/${id_time}`);
};

export const criaTime = async (time) => {
  const timeAdd = await axios.post(`${baseUrl}/times`, time);
};
