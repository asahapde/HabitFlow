import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
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

// ✅ Google Sign-In
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  return new Promise((resolve, reject) => {
    // ✅ Ensure popup is triggered inside an event handler
    document.addEventListener(
      "click",
      async () => {
        try {
          console.log("Opening Google Sign-In Popup...");
          const result = await signInWithPopup(auth, provider);
          console.log("Google Sign-In Success:", result.user);
          resolve(result.user);
        } catch (error) {
          console.error("Google Sign-In Error:", error);
          reject(error);
        }
      },
      { once: true }
    ); // ✅ Ensures event runs only once
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
