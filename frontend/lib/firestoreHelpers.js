// lib/firestoreHelpers.js
import { db } from './firebaseClient';
import { collection, getDocs } from 'firebase/firestore';

export const fetchUsers = async () => {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);

  return snapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data()
  }));
};
