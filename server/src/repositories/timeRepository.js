import db from "../config/firebaseConfig.js";
import admin from "firebase-admin";
export const buscaTimesRepository = async () => {
  let times = [];
  const snapshot = await db.collection("times").get();
  if (snapshot.empty) return [];
  snapshot.forEach((doc) => {
    times.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return times;
};

export const cadastraTimeRepository = async (time, usuario) => {
  const id_user = time.usuarios[0];
  const timesRef = await db.collection("times").add(time);
  if (!timesRef?.id) {
    return timesRef;
  }

  const userDocRef = db.collection("usuarios").doc(id_user);

  const user = await userDocRef.update({
    time: admin.firestore.FieldValue.arrayUnion(timesRef.id),
  });
  return timesRef;
};

export const apagaTimePorIdRepository = async (id) => {
  const timeRef = db.collection("times").doc(id);
  const timeDoc = await timeRef.get();

  if (!timeDoc.exists) {
    throw new Error("Time não encontrado.");
  }

  const timeData = timeDoc.data();
  const usuarios = timeData.usuarios || [];

  const batch = db.batch();
  usuarios.forEach((userId) => {
    const userDocRef = db.collection("usuarios").doc(userId);
    batch.update(userDocRef, {
      time: admin.firestore.FieldValue.arrayRemove(id),
    });
  });

  await batch.commit();

  await timeRef.delete();
  await timeRef.delete();
};
