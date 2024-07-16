//configuração do firebase, com o banco

import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = {
  type: process.env.fb_type,
  project_id: process.env.fb_project_id,
  private_key_id: process.env.fb_private_key_id,
  private_key: process.env.fb_private_key,
  client_email: process.env.fb_client_email,
  client_id: process.env.fb_client_id,
  auth_uri: process.env.fb_auth_uri,
  token_uri: process.env.fb_token_uri,
  auth_provider_x509_cert_url: process.env.fb_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.fb_client_x509_cert_url,
  universe_domain: process.env.fb_universe_domain,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export default db;

// import {initializeApp} from "firebase/app";
// import {getFirestore} from "firebase/firestore";
// import {getAuth} from "firebase/auth";
// import dotenv from "dotenv";
// dotenv.config();

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.fb_apiKey,
//   authDomain: process.env.fb_authDomain,
//   projectId: process.env.fb_projectId,
//   fb_storageBucket: process.env.fb_storageBucket,
//   messagingSenderId: process.env.fb_messagingSenderId,
//   appId: process.env.fb_appId,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore();
// const auth = getAuth(app);

// export default {app, db, auth};
