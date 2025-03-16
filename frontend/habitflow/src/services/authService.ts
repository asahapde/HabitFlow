import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// ✅ Function to Check if User is on Mobile
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// ✅ Sign Up Function (Includes Name)
export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // ✅ Update the user's display name in Firebase Auth
    await updateProfile(user, { displayName: name });

    return user;
  } catch (error: any) {
    console.error("Sign Up Error:", error.message);
    throw error;
  }
};

/**
 * 🔥 Sign in with Google - Uses Popup, Falls Back to Redirect
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  setPersistence(auth, browserLocalPersistence)
    .then(async () => {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
    });
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
