import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const redirectPath = requireAdmin ? '/auth/admin-login' : '/auth/login';
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/customer/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
