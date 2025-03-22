import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
