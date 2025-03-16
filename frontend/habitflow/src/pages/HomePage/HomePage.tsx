import { FC } from "react";
import { useAuth } from "../../context/AuthContext";

const HomePage: FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome, {user?.displayName || "User"}!</h2>
    </div>
  );
};

export default HomePage;
