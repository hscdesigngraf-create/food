import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: "cliente" | "vendedor" | "admin";
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.tipo !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
