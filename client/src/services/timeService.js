const baseUrl = "http://localhost:4000";
import axios from "axios";

export const buscatimes = async () => {
  const times = await axios.get(`${baseUrl}/times`);

  return times.data;
};
