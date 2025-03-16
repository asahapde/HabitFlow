import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  signInWithCredential,
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
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    console.log("🔥 Setting Firebase authentication persistence...");
    await setPersistence(auth, browserLocalPersistence); // ✅ Ensures authentication persists after refresh

    console.log(`📱 Device Type: ${isMobile() ? "Mobile" : "Desktop"}`);

    console.log("✅ Attempting Google Sign-In with Popup...");
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Google Sign-In Success:", result.user);
      return result.user;
    } catch (error: any) {
      console.warn("🚨 Popup blocked!");

      // ✅ On mobile, use credential-based sign-in
      if (isMobile()) {
        console.log("📱 Using credential-based sign-in on mobile...");
        const credential = GoogleAuthProvider.credentialFromError(error);
        if (credential) {
          const result = await signInWithCredential(auth, credential);
          console.log(
            "✅ Google Sign-In with Credential Success:",
            result.user
          );
          return result.user;
        }
      }

      throw error;
    }
  } catch (error) {
    console.error("❌ Google Sign-In Error:", error);
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
