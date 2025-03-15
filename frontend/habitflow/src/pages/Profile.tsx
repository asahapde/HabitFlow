import { FC } from "react";
import { logout } from "../authService";

const Profile: FC = () => {
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
