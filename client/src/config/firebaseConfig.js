import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCODcymVMPeid5Vq5TVM8G4yFEEibtAMdY",
  authDomain: "postech-fiap-2a4d7.firebaseapp.com",
  projectId: "postech-fiap-2a4d7",
  storageBucket: "postech-fiap-2a4d7.appspot.com",
  messagingSenderId: "164779905537",
  appId: "1:164779905537:web:d957cc416f87382efb2600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

export { app, db, auth };
