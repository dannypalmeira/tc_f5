import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../firebase/firebase";

export const signIn = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    throw new Error("Email ou senha inválidos.");
  }
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Erro ao fazer login com Google:", error);
    return error;
  }
};

export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {message: "Email de redefinição de senha enviado"};
  } catch (error) {
    console.error("Erro ao enviar email de redefinição de senha:", error);
    return error;
  }
};

export const doPasswordChange = async (password) => {
  try {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, password);
      return {message: "Senha atualizada com sucesso"};
    } else {
      throw new Error("Nenhum usuário está logado");
    }
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return error;
  }
};

export const doSignOut = async () => {
  try {
    await auth.signOut();
    return {message: "Logout realizado com sucesso"};
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return error;
  }
};

export const signUp = async (email, password, userData) => {
  try {
    console.log("data", userData);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "usuarios", user.uid), {
      ...userData,
      uid: user.uid,
    });
    return user;
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    return error;
  }
};
