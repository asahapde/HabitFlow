import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./ProtectedRoute.scss";

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );

  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
