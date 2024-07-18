import db from "../config/firebaseConfig.js";
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
  const timesRef = await db.collection("times").add(time);
  return timesRef;
};
