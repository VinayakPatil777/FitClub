import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContextProvider";

const PrivateRoute = ({ element, requiredPlan }) => {
  const { userPlan } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (
      !userPlan ||
      (requiredPlan === "standard" && userPlan === "free") ||
      (requiredPlan === "gold" && userPlan !== "gold")
    ) {
      toast.warn("Upgrade to access this content!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [location.pathname]); // Runs only when the route changes

  if (
    requiredPlan === "standard" &&
    (userPlan === "standard" || userPlan === "gold")
  ) {
    return element;
  } else if (requiredPlan === "gold" && userPlan === "gold") {
    return element;
  } else {
    return <Navigate to="/membership" />;
  }
};

export default PrivateRoute;
