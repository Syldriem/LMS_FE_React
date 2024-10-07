import { ReactElement, useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks";
import { hasTokenExpired } from "../utils";

interface IRequireAuthProps {
  children: ReactElement;
}



export function RequireAuth({ children }: IRequireAuthProps): ReactElement {
  const { tokens } = useAuthContext(); // Access tokens from AuthContext

  // Token expiration check
  if (!tokens || hasTokenExpired(tokens.accessToken)) {
    alert("Session expired, you have been logged out");
    return <Navigate to="/login" replace />; // Redirect to login if the token is expired
  }

  

  // Role-based access control
  if (tokens) {
    return children; // Allow access if the user role is teacher or student
  } else {
    return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized page
  }


}
