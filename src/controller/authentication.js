import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export async function signUpUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

export async function signInUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

export async function signOutUser() {
  await signOut(auth);
}
