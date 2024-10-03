import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasTokenExpired, ITokens, TOKENS } from "../utils"; // Import necessary utils
import { RequireAuth } from "../components/RequireAuth"; // Assuming RequireAuth is in the components folder
import { useLocalStorage } from "usehooks-ts";
import { useAuthContext } from "../hooks"; // Assuming you have an auth context hook

interface AuthGuardProps {
  children: ReactElement;
  redirectPath?: string; // Path to redirect if unauthorized or token expired
}

export const AuthGuard = ({ children, redirectPath = "/login" }: AuthGuardProps) => {
  const { tokens, isLoggedIn, logout } = useAuthContext(); // Assuming logout function is available
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      if ((tokens && hasTokenExpired(tokens.accessToken))) {
        console.log("tokens?.accessToken")
        logout(); // Log out the user if token is expired or not logged in
        navigate(redirectPath); // Redirect to login or a custom path
      }
    };

    checkToken();
  }, [isLoggedIn, tokens, navigate, redirectPath, logout]);

  return <RequireAuth>{children}</RequireAuth>; // Wrap the children with RequireAuth if needed
};
