import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasTokenExpired, ITokens, TOKENS } from "../utils"; 
import { RequireAuth } from "../components/RequireAuth";
import { useAuthContext } from "../hooks"; 

interface AuthGuardProps {
  children: ReactElement;
  redirectPath?: string;
}

export const AuthGuard = ({ children, redirectPath = "/login" }: AuthGuardProps) => {
  const { tokens, isLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      if ((tokens && hasTokenExpired(tokens.accessToken))) {
        logout();
        navigate(redirectPath);
      }
    };

    checkToken();
  }, [isLoggedIn, tokens, navigate, redirectPath, logout]);

  return <RequireAuth>{children}</RequireAuth>; 
};
