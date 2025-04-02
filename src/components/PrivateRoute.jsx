import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, requiredPlan }) => {

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredPlan && plan !== requiredPlan) {
    return <Navigate to="/membership" />; // Redirect if plan is insufficient
  }

  return element;
};

export default PrivateRoute;
