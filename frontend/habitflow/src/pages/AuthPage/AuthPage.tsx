import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signIn, signUp } from "../../services/authService"; // Import auth functions
import "./AuthPage.scss";

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect if already logged in
    }
  }, [user, navigate]);

  // Function to map Firebase error codes to readable messages
  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: { [key: string]: string } = {
      "auth/email-already-in-use":
        "This email is already registered. Try logging in.",
      "auth/invalid-email": "Invalid email format. Please enter a valid email.",
      "auth/weak-password": "Password should be at least 6 characters long.",
      "auth/user-disabled": "This account has been disabled. Contact support.",
      "auth/user-not-found":
        "No account found with this email. Please sign up.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/invalid-credential":
        "Invalid email or password. Please check your credentials.",
      "auth/network-request-failed":
        "Network error. Check your internet connection.",
      "auth/too-many-requests": "Too many login attempts. Try again later.",
      "auth/operation-not-allowed": "This sign-in method is not enabled.",
      "auth/internal-error": "An unexpected error occurred. Please try again.",
    };

    return (
      errorMessages[errorCode] ||
      "An unexpected error occurred. Please try again."
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      const firebaseError = err.code || "auth/internal-error";
      setError(getErrorMessage(firebaseError));
    }
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const title = isSignUp ? "Create an Account" : "Welcome Back";

  const message = isSignUp
    ? "Sign up to start tracking your habits!"
    : "Sign in to continue";

  const buttonText = isSignUp ? "Sign Up" : "Sign In";

  const toggleText = isSignUp
    ? "Already have an account?"
    : "Don't have an account?";
  const toggleButtonText = isSignUp ? "Sign In" : "Sign Up";

  if (loading) return <div className="loading-screen">Loading...</div>; // ✅ Show a loader instead of flashing the page

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{title}</h2>
        <p>{message}</p>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="on"
          />
          <button type="submit">{buttonText}</button>
        </form>

        <p className="toggle-text">
          {toggleText} <span onClick={handleToggle}>{toggleButtonText}</span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
