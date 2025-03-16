import React from "react";
import { useAuth } from "../../context/AuthContext";
import "./HomePage.scss";

const HomePage: React.FC = () => {
  const { user } = useAuth(); // ✅ Get user data

  return (
    <div className="home-container">
      <h2>Welcome, {user?.displayName || "Guest"}!</h2>

      {user?.photoURL && ( // ✅ Show profile picture only if available
        <img src={user.photoURL} alt="Profile" className="profile-picture" />
      )}
    </div>
  );
};

export default HomePage;
