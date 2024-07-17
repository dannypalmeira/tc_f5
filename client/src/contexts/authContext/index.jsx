import React, {useContext, useEffect, useState} from "react";
import {GoogleAuthProvider} from "firebase/auth";
import {onAuthStateChanged} from "firebase/auth";
import {doc, onSnapshot} from "firebase/firestore";
import {auth, db} from "../../firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export function AuthProvider({children}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedOut(false);
        onSnapshot(doc(db, "usuarios", currentUser.uid), (doc) => {
          const user = doc.data();
          setUser({
            id: user.uid,
            nome: user.nome,
            sobrenome: user.sobrenome,
            email: user.email,
          });
        });
      } else {
        setIsLoggedOut(true);
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{isLoading, isLoggedOut, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}
