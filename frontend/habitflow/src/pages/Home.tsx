import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Home: FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<string>("Loading...");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData("Failed to load data");
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome, {user?.displayName || "User"}!</h2>
      <p>Data from backend: {data}</p>
    </div>
  );
};

export default Home;
