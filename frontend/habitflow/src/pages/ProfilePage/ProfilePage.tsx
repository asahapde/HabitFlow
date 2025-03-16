import React from "react";
import { useAuth } from "../../context/AuthContext"; // Import auth context
import { logout } from "../../services/authService"; // Import logout function
import "./ProfilePage.scss";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <h2>Welcome, {user?.displayName || "User"}!</h2>
      <p>Manage your account settings here.</p>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
