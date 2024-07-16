import auth from "../config/firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
export const loginRepository = async ({email, password}) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    console.log("eroooooo", error);
    //throw new Error("Email ou senha inválidos.", error);
  }
};
