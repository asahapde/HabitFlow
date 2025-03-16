import { getRedirectResult, onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseConfig";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    console.log("🔥 Checking Firebase Authentication State...");

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        console.log("🟡 No user detected, checking redirect result...");

        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log("✅ Google Redirect Login Success:", result.user);
          setUser(result.user);
        }
      } else {
        console.log("✅ User is already authenticated:", firebaseUser);
        setUser(firebaseUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
