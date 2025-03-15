import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.scss"; // Import SCSS for styling

const Navbar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null; // Hide Navbar when not authenticated

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-item">
        <span className="icon">🏠</span>
        <span className="label">Home</span>
      </NavLink>
      <NavLink to="/habits" className="nav-item">
        <span className="icon">📋</span>
        <span className="label">Habits</span>
      </NavLink>
      <NavLink to="/insights" className="nav-item">
        <span className="icon">📊</span>
        <span className="label">Insights</span>
      </NavLink>
      <NavLink to="/profile" className="nav-item">
        <span className="icon">👤</span>
        <span className="label">Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
