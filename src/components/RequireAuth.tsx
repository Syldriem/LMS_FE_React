import { ReactElement, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks";
import { hasTokenExpired, IUserLoggedIn } from "../utils";
import { jwtDecode } from "jwt-decode";

interface IRequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: IRequireAuthProps): ReactElement {
  const { tokens } = useAuthContext(); // Access tokens from AuthContext

  // Token expiration check
  if (!tokens || hasTokenExpired(tokens.accessToken)) {
    return <Navigate to="/login" replace />; // Redirect to login if the token is expired
  }

  // Role-based access control
  if (tokens) {
    return children; // Allow access if the user role is teacher or student
  } else {
    return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized page
  }
}
