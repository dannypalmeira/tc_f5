import {loginRepository} from "../repositories/authRepository.js";
export const loginService = async (body) => {
  const {email, password} = body;
  if (!email || !password) {
    return "Digite todos os campos.";
  }

  const res = await loginRepository({email, password});
  console.log("res", res);
  return res;
};
