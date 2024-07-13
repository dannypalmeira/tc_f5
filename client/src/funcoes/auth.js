import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithPopup,
    signInWithEmailAndPassword,
    updatePassword
  } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  import { auth, db } from "../firebase/firebase";
  
  export const signIn = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (error) {
      return error;
    }
  };

  export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
  };

  export const doPasswordReset = (email) => {
    return sendPasswordResetEmail (auth, email);
  };

  export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
  };
  
  export const doSignOut = () => {
    return auth.signOut();
  };
  
  export const signUp = async (email, password, userData) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "usuarios", user.user.uid), {
        ...userData,
        uid: user.user.uid,
      });
      return user.user;
    } catch (error) {
      return error;
    }
  };