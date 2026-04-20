import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASJmrBU0OV9nxoudVZXi3AXfoTQdjucHE",
  authDomain: "hormoneplus-a524c.firebaseapp.com",
  projectId: "hormoneplus-a524c",
  storageBucket: "hormoneplus-a524c.firebasestorage.app",
  messagingSenderId: "832897639881",
  appId: "1:832897639881:web:1403d44a100563ed1b3418",
  measurementId: "G-CFEVRB41KW",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
