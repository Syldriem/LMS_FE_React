import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { CustomError, hasTokenExpired, IAuthContext, ITokens, IUserLoggedIn, loginReq, refreshTokens, roleJsonFromToken, TOKENS } from "../utils";
import { useLocalStorage } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
    TOKENS,
    null
  );
  const [userRole, setUserRole] = useState<string>("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  const values: IAuthContext = {
    tokens, isLoggedIn, login, logout
  };

  async function login(username: string, password: string) {
    try {
      const tokens = await loginReq(username, password);
      setTokens(tokens);
      console.log("Login tokens received :", tokens);

    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error);
      }
    }
  }
  
  function logout() {
    clearTokens();
    setIsLoggedIn(false);
  }
  
  useEffect(() => {
    const handleTokenExpiry = async () => {
      if (tokens) {
        const accessTokenExpired = hasTokenExpired(tokens.accessToken);

        if (accessTokenExpired) {
          if (tokens.refreshToken && !hasTokenExpired(tokens.refreshToken)) {
            // Attempt to refresh tokens
            try {
              const refreshedTokens = await refreshTokens(tokens.accessToken, tokens.refreshToken);
              setTokens(refreshedTokens);
              setIsLoggedIn(true);
            } catch (error) {
              console.log("Failed to refresh token:", error);
              logout(); // Log out if token refresh fails
            }
          } else {
            // If no valid refresh token, log out
            logout();
          }
        } else {
          // Token is still valid
          setIsLoggedIn(true);
        }
      } else {
        // No tokens, user is not logged in
        setIsLoggedIn(false);
      }
    };

    handleTokenExpiry();
  }, [tokens]);
  
  useEffect(() => {
    if (tokens) {
      const role = roleJsonFromToken(tokens?.accessToken);
      setUserRole(role);
      console.log("userRole extracted from access token is: ", role);
    } else {
      setUserRole("No access token available");
    }
    [tokens, userRole];
  });
  
    console.log(
      "In authcontext the userRole is now set to :",values.userRole,". The log-status is set to :",values.isLoggedIn,".");
    

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
