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
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const logout = async () => {
    await auth.signOut();
    window.location.href = "/auth";
  };

  const thumbsOptions = [
    "https://api.dicebear.com/7.x/thumbs/svg?seed=flame",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=lavender",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=mango",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=bubblegum",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=emerald",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=tangerine",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=sky",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=cobalt",
  ];

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h2>Profile</h2>

        <div className="profile-card">
          <img
            src={photoURL || thumbsOptions[0]}
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

              <div className="avatar-style-picker">
                <label>Select an Avatar</label>
                <div className="style-options">
                  {thumbsOptions.map((url) => (
                    <img
                      key={url}
                      src={url}
                      className={photoURL === url ? "selected" : ""}
                      onClick={() => setPhotoURL(url)}
                      alt="avatar option"
                    />
                  ))}
                </div>
              </div>

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
    </div>
  );
};

export default ProfilePage;
