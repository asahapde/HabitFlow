import React from "react";
import { logout } from "../../authService"; // Import logout function
import { useAuth } from "../../context/AuthContext"; // Import auth context
import "./Profile.scss";

const Profile: React.FC = () => {
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

export default Profile;
