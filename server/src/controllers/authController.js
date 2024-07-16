import {loginService} from "../services/authService.js";

export const loginController = async (req, res) => {
  try {
    const resp = await loginService(req.body);
    console.log("resp", resp);
  } catch (ex) {
    console.log("ex", ex);
    return res.status(500).send();
  }
};
