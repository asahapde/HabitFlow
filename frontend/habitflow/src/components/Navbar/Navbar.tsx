import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.scss"; // Import SCSS for styling

const Navbar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null; // Hide Navbar when not authenticated

  return (
    <nav className="navbar">
      <NavLink to="/app" className="nav-item">
        <span className="icon">🏠</span>
        <span className="label">Home</span>
      </NavLink>
      <NavLink to="/app/habits" className="nav-item">
        <span className="icon">📋</span>
        <span className="label">Habits</span>
      </NavLink>
      <NavLink to="/app/insights" className="nav-item">
        <span className="icon">📊</span>
        <span className="label">Insights</span>
      </NavLink>
      <NavLink to="/app/profile" className="nav-item">
        <span className="icon">👤</span>
        <span className="label">Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
