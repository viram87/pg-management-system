import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ isLoggedin, children }) => {
  if (!isLoggedin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default PrivateRoute;
