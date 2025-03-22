import { updateProfile } from "firebase/auth";
import { FC, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../services/firebaseConfig";
import "./ProfilePage.scss";

const ProfilePage: FC = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      setIsEditing(false);
      window.location.reload(); // Refresh to reflect new info
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const logout = async () => {
    await auth.signOut();
    window.location.href = "/auth"; // redirect after logout
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      <div className="profile-card">
        <img
          src={
            photoURL ||
            "https://api.dicebear.com/7.x/thumbs/svg?seed=habitflow&backgroundColor=b6e3f4"
          }
          alt="User Avatar"
          className="avatar"
        />

        {!isEditing ? (
          <>
            <h3>{displayName || "Anonymous"}</h3>
            <p>{user?.email}</p>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <div className="edit-form">
            <label>
              Name
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>
            <label>
              Photo URL
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </label>
            <div className="edit-actions">
              <button className="save-btn" onClick={handleUpdate}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
