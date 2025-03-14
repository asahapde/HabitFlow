import axios from "axios";
import { FC, useEffect, useState } from "react";

const Home: FC = () => {
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
      <p>Data from backend: {data}</p>
    </div>
  );
};

export default Home;
