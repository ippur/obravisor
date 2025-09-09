// src/components/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // começa indefinido

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // transforma em true/false
  }, []);

  if (isAuthenticated === null) {
    return null; // ou um spinner/loading, se quiser
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
