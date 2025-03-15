import React from "react";
import { logout } from "../../authService"; // Import logout function
import "./Profile.scss"; // Import SCSS for styling

const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p>Manage your account settings here.</p>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
