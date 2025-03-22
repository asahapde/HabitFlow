import { updateProfile } from "firebase/auth";
import { FC, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../services/firebaseConfig";
import "./ProfilePage.scss";

const dicebearStyles = ["thumbs", "bottts", "avataaars", "micah", "notionists"];

const ProfilePage: FC = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [selectedStyle, setSelectedStyle] = useState("thumbs");
  const [isEditing, setIsEditing] = useState(false);

  const seed = user?.uid || "default";

  const handleUpdate = async () => {
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const logout = async () => {
    await auth.signOut();
    window.location.href = "/auth";
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      <div className="profile-card">
        <img
          src={
            photoURL ||
            `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seed}`
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

            <label>
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPhotoURL(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>

            <div className="avatar-style-picker">
              <label>Choose Dicebear Style</label>
              <div className="style-options">
                {dicebearStyles.map((style) => (
                  <img
                    key={style}
                    src={`https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`}
                    alt={style}
                    className={selectedStyle === style ? "selected" : ""}
                    onClick={() => {
                      setSelectedStyle(style);
                      setPhotoURL(
                        `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`
                      );
                    }}
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
  );
};

export default ProfilePage;
