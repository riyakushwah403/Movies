import React from "react";
import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/signin");
    return null; // Render nothing when redirecting
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
