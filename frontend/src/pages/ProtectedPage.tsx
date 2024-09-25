import React from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedPage = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, currentUser } = useAuthStore();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedPage;
