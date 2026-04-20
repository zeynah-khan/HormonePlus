import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function saveSymptomLogToCloud(log, userId) {
  await addDoc(collection(db, 'symptomLogs'), {
    ...log,
    userId,
    createdAt: new Date().toISOString(),
  });
}

export async function getUserSymptomLogs(userId) {
  const q = query(
    collection(db, 'symptomLogs'),
    where('userId', '==', userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}