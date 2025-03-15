import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Sign Up Function
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error("Sign Up Error:", error.message);
    throw error;
  }
};

// Sign In Function
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error("Sign In Error:", error.message);
    throw error;
  }
};

// Logout Function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Logout Error:", error.message);
    throw error;
  }
};
